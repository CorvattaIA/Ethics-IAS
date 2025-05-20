import React from 'react';
    import { Button } from '@/components/ui/button';

    const ChatQuickReplies = ({ quickReplies, onSelect }) => {
      if (!quickReplies || quickReplies.length === 0) return null;

      return (
        <div className="flex space-x-2 mb-2 overflow-x-auto pb-1 no-scrollbar">
          {quickReplies.map(reply => (
            <Button 
              key={reply} 
              variant="outline" 
              size="sm" 
              className="border-brand-deep-teal text-brand-deep-teal hover:bg-brand-deep-teal hover:text-brand-light-text whitespace-nowrap text-xs py-1 px-3 rounded-full transition-all duration-200"
              onClick={() => onSelect(reply)}
            >
              {reply}
            </Button>
          ))}
        </div>
      );
    };
    // Helper class for no-scrollbar (if Tailwind plugin not used)
    // .no-scrollbar::-webkit-scrollbar { display: none; }
    // .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    export default ChatQuickReplies;