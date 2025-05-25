
import { useState, useEffect } from "react";
import { MapPin, Clock, Heart, MessageCircle, Share2, Eye, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Item } from "@/hooks/useItems";
import CommentsModal from "./CommentsModal";

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const { user } = useAuth();
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(item.upvotes || 0);
  const [commentCount, setCommentCount] = useState(item.comments || 0);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (user) {
      checkIfUpvoted();
    }
  }, [user, item.id]);

  const checkIfUpvoted = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('upvotes')
      .select('id')
      .eq('item_id', item.id)
      .eq('user_id', user.id)
      .single();

    setUpvoted(!!data);
  };

  const handleUpvote = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to upvote items.",
        variant: "destructive",
      });
      return;
    }

    if (upvoted) {
      // Remove upvote
      const { error } = await supabase
        .from('upvotes')
        .delete()
        .eq('item_id', item.id)
        .eq('user_id', user.id);

      if (!error) {
        setUpvoted(false);
        setUpvoteCount(prev => prev - 1);
      }
    } else {
      // Add upvote
      const { error } = await supabase
        .from('upvotes')
        .insert([{ item_id: item.id, user_id: user.id }]);

      if (!error) {
        setUpvoted(true);
        setUpvoteCount(prev => prev + 1);
      }
    }
  };

  const handleContact = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to contact item owners.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Contact Information",
      description: item.contact_info,
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: item.title,
      text: item.description,
      url: window.location.href
    };

    // Try native share first, with fallback to clipboard
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        toast({
          title: "Shared Successfully",
          description: "Item has been shared.",
        });
      } catch (error) {
        // User cancelled or share failed, fall back to clipboard
        handleClipboardShare();
      }
    } else {
      // Fallback to clipboard
      handleClipboardShare();
    }
  };

  const handleClipboardShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Item link has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Unable to share this item. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleComments = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to view and add comments.",
        variant: "destructive",
      });
      return;
    }
    setShowComments(true);
  };

  const handleViewDetails = () => {
    toast({
      title: "Item Details",
      description: "Detailed view will be available in the next update.",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="p-0">
          <div className="relative">
            {item.image_url ? (
              <img 
                src={item.image_url} 
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            <Badge 
              className={`absolute top-3 left-3 ${
                item.type === 'lost' 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {item.type === 'lost' ? 'Lost' : 'Found'}
            </Badge>
            <Badge 
              variant="secondary" 
              className="absolute top-3 right-3 bg-white/90 text-gray-700"
            >
              {item.category}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{item.location}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{formatDate(item.created_at)}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <div className="w-full space-y-3">
            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className={`flex-1 flex items-center gap-2 ${
                  item.type === 'lost' 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
                onClick={handleContact}
              >
                <Phone className="w-4 h-4" />
                Contact Owner
              </Button>
              <Button size="sm" variant="outline" onClick={handleViewDetails}>
                <Eye className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Engagement Bar */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleUpvote}
                  className={`flex items-center gap-1 hover:text-red-500 transition-colors ${
                    upvoted ? 'text-red-500' : ''
                  }`}
                >
                  <Heart className={`w-4 h-4 ${upvoted ? 'fill-current' : ''}`} />
                  <span>{upvoteCount}</span>
                </button>
                <button 
                  onClick={handleComments}
                  className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{commentCount}</span>
                </button>
              </div>
              <button 
                onClick={handleShare}
                className="flex items-center gap-1 hover:text-blue-500 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Comments Modal */}
      {showComments && (
        <CommentsModal
          itemId={item.id}
          isOpen={showComments}
          onClose={() => setShowComments(false)}
          onCommentAdded={() => setCommentCount(prev => prev + 1)}
        />
      )}
    </>
  );
};

export default ItemCard;
