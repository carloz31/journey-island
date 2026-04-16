import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, TrendingUp, Heart, Lightbulb, Brain, Users, BookOpen, Compass, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { studentData } from '@/data/mockData';
import { vocationalProfile } from '@/data/profileData';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4 } }),
};

const VocationalProfile = () => {
  const navigate = useNavigate();
  const p = vocationalProfile;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-30 glass-panel rounded-none border-x-0 border-t-0 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate('/adventure')}
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Regresar a la aventura
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* ─── HEADER ─── */}
        <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-center space-y-4">
          <div className="flex justify-center">
            <Avatar className="w-16 h-16 border-3 border-primary">
              <AvatarFallback className="bg-primary/15 text-primary font-display font-bold text-xl">
                {studentData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Tu Perfil Vocacional</h1>
            <p className="text-muted-foreground mt-1 max-w-lg mx-auto text-sm">
              Un resumen de tus resultados actuales en las actividades de autodescubrimiento. Este perfil evoluciona contigo.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-48">
              <Progress value={p.completionPct} className="h-2.5" />
            </div>
            <span className="text-xs font-semibold text-primary">{p.completionPct}% completo</span>
          </div>
          <p className="text-xs text-muted-foreground italic flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            {p.activitiesCompleted} de {p.activitiesTotal} actividades completadas — ¡sigue explorando!
          </p>
        </motion.section>

        {/* ─── SUMMARY CARD ─── */}
        <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={1}>
          <div className="glass-panel p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-accent" />
              <h2 className="font-display font-bold text-lg text-foreground">Síntesis de tu perfil</h2>
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed">{p.summary}</p>
          </div>
        </motion.section>

        {/* ─── SOCIAL SKILLS ─── */}
        <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={2} className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg text-foreground">Habilidades Sociales</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Skills bars */}
            <div className="glass-panel p-5 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tus habilidades</p>
              {p.socialSkills.map((s) => (
                <div key={s.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-foreground">{s.name}</span>
                    <span className={s.category === 'strength' ? 'text-success font-semibold' : 'text-muted-foreground'}>{s.score}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${s.category === 'strength' ? 'bg-primary' : 'bg-muted-foreground/40'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.score}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Growth plan */}
            <div className="glass-panel p-5 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Plan de crecimiento</p>
              <p className="text-xs text-muted-foreground">Pequeños pasos para fortalecer tus habilidades sociales y de colaboración.</p>
              <ul className="space-y-2">
                {p.socialGrowthPlan.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* ─── LEARNING STYLES ─── */}
        <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={3} className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-secondary" />
            <h2 className="font-display font-bold text-lg text-foreground">Estilos de Aprendizaje</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Dimension sliders */}
            <div className="glass-panel p-5 space-y-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tus preferencias</p>
              {p.learningDimensions.map((d) => {
                const pct = (d.value + 100) / 2; // 0-100 scale where 50=center
                return (
                  <div key={d.labelA} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-foreground">
                      <span className={pct < 50 ? 'text-primary font-bold' : ''}>{d.labelA}</span>
                      <span className={pct > 50 ? 'text-primary font-bold' : ''}>{d.labelB}</span>
                    </div>
                    <div className="relative h-3 rounded-full bg-muted">
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-2 border-primary-foreground shadow-md"
                        initial={{ left: '50%' }}
                        animate={{ left: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        style={{ marginLeft: '-8px' }}
                      />
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Tips */}
            <div className="glass-panel p-5 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Cómo aprendes mejor</p>
              <ul className="space-y-2">
                {p.learningTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* ─── MULTIPLE INTELLIGENCES ─── */}
        <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={4} className="space-y-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-lavender" />
            <h2 className="font-display font-bold text-lg text-foreground">Inteligencias Múltiples</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {p.intelligences
              .sort((a, b) => b.score - a.score)
              .map((intel, i) => (
                <motion.div
                  key={intel.name}
                  className="glass-panel p-4 space-y-2 hover:glow-primary transition-shadow"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={4 + i * 0.1}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{intel.icon}</span>
                    <span className="font-display font-bold text-sm text-foreground">{intel.name}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-lavender"
                      initial={{ width: 0 }}
                      animate={{ width: `${intel.score}%` }}
                      transition={{ duration: 0.6, delay: 0.4 + i * 0.05 }}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug">{intel.description}</p>
                </motion.div>
              ))}
          </div>
        </motion.section>

        {/* ─── PERSONALITY ─── */}
        <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={5} className="space-y-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-destructive" />
            <h2 className="font-display font-bold text-lg text-foreground">Perfil de Personalidad</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Traits */}
            <div className="glass-panel p-5 space-y-3 md:col-span-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Rasgos destacados</p>
              {p.personalityTraits.map((t) => (
                <div key={t.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-foreground">{t.name}</span>
                    <span className="text-muted-foreground">{t.score}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${t.score}%` }}
                      transition={{ duration: 0.7, delay: 0.3 }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground">{t.description}</p>
                </div>
              ))}
            </div>
            {/* Environments */}
            <div className="md:col-span-2 grid gap-4">
              <div className="glass-panel p-5 space-y-2">
                <p className="text-xs font-semibold text-success uppercase tracking-wide">Entornos donde te sentirías cómoda</p>
                <div className="flex flex-wrap gap-2">
                  {p.comfortEnvironments.map((e) => (
                    <span key={e} className="px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-medium">{e}</span>
                  ))}
                </div>
              </div>
              <div className="glass-panel p-5 space-y-2">
                <p className="text-xs font-semibold text-warning uppercase tracking-wide">Entornos que podrían requerir más adaptación</p>
                <div className="flex flex-wrap gap-2">
                  {p.stretchEnvironments.map((e) => (
                    <span key={e} className="px-3 py-1.5 rounded-full bg-warning/10 text-warning text-xs font-medium">{e}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─── VOCATIONAL AFFINITIES ─── */}
        <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={6} className="space-y-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-gold-strong" />
            <h2 className="font-display font-bold text-lg text-foreground">Afinidades Vocacionales</h2>
          </div>
          <p className="text-sm text-muted-foreground -mt-2">Caminos posibles a explorar, no destinos fijos. Tu perfil puede cambiar a medida que te conoces mejor.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {p.affinities.map((a, i) => (
              <motion.div key={a.name} className="glass-panel p-4 space-y-2" variants={fadeUp} initial="hidden" animate="visible" custom={6 + i * 0.1}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{a.icon}</span>
                    <span className="font-display font-bold text-sm text-foreground">{a.name}</span>
                  </div>
                  <span className="text-xs font-bold text-primary">{a.match}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${a.match}%` }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">{a.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── RECOMMENDATIONS ─── */}
        <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={7} className="space-y-4 pb-12">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg text-foreground">Próximos pasos recomendados</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {p.recommendations.map((r) => (
              <div key={r.title} className="glass-panel p-5 space-y-2 hover:glow-primary transition-shadow">
                <span className="text-2xl">{r.icon}</span>
                <h3 className="font-display font-bold text-sm text-foreground">{r.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.description}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default VocationalProfile;
