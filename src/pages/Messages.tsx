import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Inbox } from 'lucide-react';
import TopBar from '@/components/TopBar';
import MessageDetailPanel from '@/components/messages/MessageDetailPanel';
import MessageListItem from '@/components/messages/MessageListItem';
import MessagesToolbar, { MessageStatusFilter } from '@/components/messages/MessagesToolbar';
import { Message, messagesData } from '@/data/mockData';

const Messages = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<MessageStatusFilter>('all');
  const selectedMessageId = searchParams.get('message');

  const filteredMessages = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return messagesData.filter((message) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'unread' && message.unread) ||
        (filter === 'read' && !message.unread);

      const searchableText = [
        message.sender,
        message.title,
        message.preview,
        ...message.body,
      ].join(' ').toLowerCase();

      return matchesFilter && (!normalizedSearch || searchableText.includes(normalizedSearch));
    });
  }, [filter, search]);

  const selectedMessage = useMemo(() => {
    return messagesData.find((message) => message.id === selectedMessageId) ?? null;
  }, [selectedMessageId]);

  const openMessage = (message: Message) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set('message', message.id);
    setSearchParams(nextSearchParams);
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-background">
      <TopBar
        onLogout={() => navigate('/')}
        onMessagesClick={() => {}}
      />

      <main className="flex-1 overflow-hidden">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-5 px-4 py-6 md:px-6">
          <Link
            to="/adventure"
            className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a la aventura
          </Link>

          <header className="space-y-2">
            <p className="text-sm font-semibold text-primary">Centro de notificaciones</p>
            <h1 className="font-display text-3xl font-bold text-foreground">Mensajes</h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Revisa avisos del sistema, mensajes de tu consejero y materiales compartidos para tu camino vocacional.
            </p>
          </header>

          <MessagesToolbar
            search={search}
            filter={filter}
            onSearchChange={setSearch}
            onFilterChange={setFilter}
          />

          <section className="grid min-h-0 flex-1 gap-4 lg:grid-cols-2">
            <div className="min-h-0 overflow-y-auto pr-1">
              <div className="space-y-3">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <MessageListItem
                      key={message.id}
                      message={message}
                      selected={selectedMessage?.id === message.id}
                      onSelect={() => openMessage(message)}
                    />
                  ))
                ) : (
                  <div className="flex min-h-[220px] flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 p-8 text-center">
                    <Inbox className="h-9 w-9 text-muted-foreground" />
                    <h2 className="mt-3 font-display text-lg font-bold text-foreground">No hay notificaciones</h2>
                    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                      Prueba con otra busqueda o cambia el filtro seleccionado.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="min-h-0">
              <MessageDetailPanel message={selectedMessage} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Messages;
