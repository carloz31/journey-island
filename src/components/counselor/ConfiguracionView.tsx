import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { counselorProfile } from '@/data/counselorMockData';

const ConfiguracionView = () => {
  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-display font-bold">Configuración</h1>

      <Tabs defaultValue="perfil">
        <TabsList>
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          <TabsTrigger value="aula">Aula</TabsTrigger>
          <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base font-display">Información del Orientador</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-xl bg-primary text-primary-foreground font-bold">PM</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Cambiar foto</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Nombre completo</Label><Input defaultValue={counselorProfile.nombre} /></div>
                <div className="space-y-2"><Label>Correo electrónico</Label><Input defaultValue={counselorProfile.correo} /></div>
                <div className="space-y-2"><Label>Rol</Label><Input defaultValue={counselorProfile.rol} disabled /></div>
                <div className="space-y-2"><Label>Teléfono</Label><Input placeholder="+51 999 999 999" /></div>
              </div>
              <Button className="gap-2"><Save className="w-4 h-4" />Guardar cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificaciones" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base font-display">Preferencias de Notificación</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                'Notificar cuando un estudiante complete una actividad',
                'Notificar cuando un estudiante lleve 7+ días inactivo',
                'Notificar cuando un apoderado active su cuenta',
                'Recibir resumen semanal por correo',
                'Notificar nuevos mensajes',
              ].map((label, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm">{label}</span>
                  <Switch defaultChecked={i < 3} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aula" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base font-display">Configuración del Aula</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Nombre del aula</Label><Input defaultValue={counselorProfile.aula} /></div>
              <div className="space-y-2"><Label>Año académico</Label><Input defaultValue={counselorProfile.anioAcademico} /></div>
              <Button className="gap-2"><Save className="w-4 h-4" />Guardar</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cuenta" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base font-display">Seguridad</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Contraseña actual</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>Nueva contraseña</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>Confirmar contraseña</Label><Input type="password" /></div>
              <Button className="gap-2"><Save className="w-4 h-4" />Cambiar contraseña</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfiguracionView;
