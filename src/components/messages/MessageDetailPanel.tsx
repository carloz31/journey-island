import { Bot, ExternalLink, FileText, Inbox, Link2, Paperclip, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Message } from '@/data/mockData';

type MessageDetailPanelProps = {
  message: Message | null;
};

const MessageDetailPanel = ({ message }: MessageDetailPanelProps) => {
  if (!message) {
    return (
      <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 p-8 text-center">
        <Inbox className="h-10 w-10 text-muted-foreground" />
        <h2 className="mt-3 font-display text-xl font-bold text-foreground">Selecciona un mensaje</h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          El detalle aparecera aqui para que puedas revisar la notificacion sin salir del listado.
        </p>
      </div>
    );
  }

  return (
    <article className="h-full overflow-y-auto rounded-lg border bg-card p-5 shadow-sm">
      <header className="space-y-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15">
            {message.senderType === 'counselor' ? (
              <User className="h-5 w-5 text-primary" />
            ) : (
              <Bot className="h-5 w-5 text-primary" />
            )}
          </div>
          <div className="min-w-0">
            <h2 className="font-display text-xl font-bold text-foreground">{message.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {message.sender} · {message.timestamp}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={message.unread ? 'destructive' : 'secondary'}>
            {message.unread ? 'No leido' : 'Leido'}
          </Badge>
          <Badge variant="outline">
            {message.senderType === 'counselor' ? 'Consejero' : 'Sistema'}
          </Badge>
        </div>
      </header>

      <div className="mt-6 space-y-6">
        <div className="space-y-3 text-sm leading-6 text-foreground">
          {message.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {!!message.attachments?.length && (
          <section className="space-y-3 border-t border-border pt-5">
            <div className="flex items-center gap-2">
              <Paperclip className="h-4 w-4 text-primary" />
              <h3 className="font-display text-sm font-bold text-foreground">Adjuntos</h3>
            </div>
            <div className="space-y-2">
              {message.attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{attachment.name}</p>
                      <p className="text-xs text-muted-foreground">{attachment.type} · {attachment.size}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {!!message.materialLinks?.length && (
          <section className="space-y-3 border-t border-border pt-5">
            <div className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-primary" />
              <h3 className="font-display text-sm font-bold text-foreground">Materiales</h3>
            </div>
            <div className="space-y-2">
              {message.materialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="block rounded-lg border bg-muted/30 p-3 transition-colors hover:bg-muted/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{link.title}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{link.description}</p>
                    </div>
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};

export default MessageDetailPanel;
