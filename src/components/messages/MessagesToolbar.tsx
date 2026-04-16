import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type MessageStatusFilter = 'all' | 'unread' | 'read';

type MessagesToolbarProps = {
  search: string;
  filter: MessageStatusFilter;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: MessageStatusFilter) => void;
};

const MessagesToolbar = ({
  search,
  filter,
  onSearchChange,
  onFilterChange,
}: MessagesToolbarProps) => (
  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <div className="relative md:max-w-sm md:flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Buscar notificaciones"
        className="pl-9"
      />
    </div>

    <Tabs value={filter} onValueChange={(value) => onFilterChange(value as MessageStatusFilter)}>
      <TabsList className="grid w-full grid-cols-3 md:w-auto">
        <TabsTrigger value="all">Todas</TabsTrigger>
        <TabsTrigger value="unread">No leídas</TabsTrigger>
        <TabsTrigger value="read">Leídas</TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
);

export default MessagesToolbar;
