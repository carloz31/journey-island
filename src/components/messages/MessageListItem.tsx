import { Bot, Link2, Paperclip, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Message } from '@/data/mockData';
import { cn } from '@/lib/utils';

type MessageListItemProps = {
  message: Message;
  selected?: boolean;
  onSelect: () => void;
};

const MessageListItem = ({ message, selected = false, onSelect }: MessageListItemProps) => {
  const hasAttachments = !!message.attachments?.length;
  const hasLinks = !!message.materialLinks?.length;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'w-full rounded-lg border bg-card p-4 text-left shadow-sm transition-colors hover:bg-muted/50',
        selected && 'border-primary bg-primary/5',
        message.unread && !selected && 'border-primary/25 bg-primary/5',
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
          message.senderType === 'counselor' ? 'bg-primary/15' : 'bg-muted',
        )}>
          {message.senderType === 'counselor' ? (
            <User className="h-4 w-4 text-primary" />
          ) : (
            <Bot className="h-4 w-4 text-muted-foreground" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-foreground">{message.sender}</span>
            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
            {message.unread && <Badge variant="destructive" className="px-2 py-0 text-[10px]">Nuevo</Badge>}
          </div>

          <h3 className="mt-1 font-display text-base font-bold text-foreground">{message.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{message.preview}</p>

          {(hasAttachments || hasLinks) && (
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
              {hasAttachments && (
                <span className="inline-flex items-center gap-1">
                  <Paperclip className="h-3.5 w-3.5" />
                  {message.attachments?.length} adjunto{message.attachments?.length === 1 ? '' : 's'}
                </span>
              )}
              {hasLinks && (
                <span className="inline-flex items-center gap-1">
                  <Link2 className="h-3.5 w-3.5" />
                  {message.materialLinks?.length} material{message.materialLinks?.length === 1 ? '' : 'es'}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default MessageListItem;
