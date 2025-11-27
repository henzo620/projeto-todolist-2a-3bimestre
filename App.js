// App.js
// Henzo, este arquivo único traz um app completo com:
// - Navegação por estado entre telas (Home, Treinos, Mentoria, Educação, Oportunidades, Live, Biblioteca, Perfil)
// - Animações com Animated (fade, slide, scale), parallax, press effects
// - Componentes reutilizáveis (Header, FooterNav, CategoryCard, InfoCard, HighlightCard, SectionHeader)
// - Ícones (MaterialCommunityIcons) e temas
// - Mock de dados e funções utilitárias
// - Transições suaves entre telas
// - Efeitos visuais (sombra, gradientes simulados, cantos arredondados, separadores)
// Tudo dentro de um único App.js.


import { Platform } from 'react-native';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Easing,
  Dimensions,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const { width } = Dimensions.get('window');

// ---------- TEMA ----------
const theme = {
  colors: {
    bg: '#0f141b',
    card: '#1a2029',
    softCard: '#212a35',
    primary: '#f57c00',
    secondary: '#4caf50',
    purple: '#9c27b0',
    blue: '#2196f3',
    accent: '#ff5722',
    text: '#e6edf3',
    subtext: '#9aa8b5',
    border: '#2a3440',
    ok: '#22c55e',
    warn: '#f59e0b',
    info: '#60a5fa',
  },
  spacing: (n) => n * 8,
  radius: {
    sm: 10,
    md: 14,
    lg: 20,
    xl: 28,
  },
};

// ---------- MOCK DE DADOS ----------
const destaqueData = [
  {
    titulo: 'História de Lucas',
    descricao: 'De periferia à liderança nas quadras.',
    imagem:
      'https://images.unsplash.com/photo-1590080877037-7c1f9b6c5c1d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    titulo: 'Nova turma de fundamentos',
    descricao: 'Inscrições abertas para jovens atletas.',
    imagem:
      'https://images.unsplash.com/photo-1609332967210-0e4c3f3b8d3b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    titulo: 'Mentoria: Ana B.',
    descricao: 'Mentora que faz o jogo e a vida acontecer.',
    imagem:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  },
];

const categorias = [
  { nome: 'Treinos', icone: 'basketball', cor: theme.colors.primary, rota: 'treinos' },
  { nome: 'Mentoria', icone: 'account-group', cor: theme.colors.secondary, rota: 'mentoria' },
  { nome: 'Oportunidades', icone: 'briefcase', cor: theme.colors.purple, rota: 'oportunidades' },
  { nome: 'Educação', icone: 'school', cor: theme.colors.blue, rota: 'educacao' },
];

const agendaTreinos = [
  { icon: 'run', title: 'Fundamentos', desc: '20/11 às 10h — Quadra Central', color: theme.colors.primary },
  { icon: 'whistle', title: 'Tático', desc: '22/11 às 14h — Ginásio Municipal', color: theme.colors.primary },
  { icon: 'dumbbell', title: 'Condicionamento', desc: '25/11 às 16h — Academia Parceira', color: theme.colors.primary },
];

const mentoriaCards = [
  { icon: 'account-tie', color: theme.colors.secondary, title: 'Ana Beatriz', desc: 'Mentora em liderança esportiva' },
  { icon: 'account', color: theme.colors.secondary, title: 'Gabriel Santos', desc: 'Aluno aguardando confirmação' },
  { icon: 'calendar', color: theme.colors.secondary, title: 'Sessão 01/07 - 11:00', desc: 'Starbucks - Av. Paulista' },
];

const educacaoCards = [
  { icon: 'school', color: theme.colors.blue, title: 'Curso de Liderança', desc: 'Formação para jovens líderes esportivos' },
  { icon: 'book-open', color: theme.colors.blue, title: 'Bolsas de Estudo', desc: 'Parcerias com escolas e universidades' },
  { icon: 'lightbulb-on', color: theme.colors.blue, title: 'Projeto de Pesquisa', desc: 'Basquete e cidadania' },
];

const oportunidadesCards = [
  { icon: 'briefcase', color: theme.colors.purple, title: 'Monitor de Quadra', desc: 'ONG Esporte+ está contratando' },
  { icon: 'book', color: theme.colors.purple, title: 'Curso de Treinamento', desc: 'Capacitação para jovens líderes' },
  { icon: 'heart-pulse', color: theme.colors.purple, title: 'Atendimento Saúde', desc: 'Fisioterapia gratuita para atletas' },
];

const liveCards = [
  { icon: 'video', color: theme.colors.accent, title: 'Torneio Sub-18', desc: 'Hoje às 18h — transmissão ao vivo' },
  { icon: 'microphone', color: theme.colors.accent, title: 'Entrevista c/ Mentor', desc: 'Amanhã às 20h — live exclusiva' },
];

const bibliotecaCards = [
  { icon: 'book-open-page-variant', color: theme.colors.info, title: 'Ebook: Basquete e Cidadania', desc: 'O esporte como ferramenta social' },
  { icon: 'headphones', color: theme.colors.info, title: 'Podcast: Superação', desc: 'Vozes que mudaram de vida nas quadras' },
  { icon: 'video', color: theme.colors.info, title: 'Documentário', desc: 'Histórias reais de transformação' },
];

const perfilCards = [
  { icon: 'map-marker', color: theme.colors.ok, title: 'Local', desc: 'Presidente Venceslau, SP' },
  { icon: 'basketball', color: theme.colors.ok, title: 'Participações', desc: '12 treinos, 3 mentorias' },
  { icon: 'target', color: theme.colors.ok, title: 'Objetivo', desc: 'Inspirar jovens com o esporte' },
  { icon: 'star', color: theme.colors.ok, title: 'Conquistas', desc: 'Campeão regional Sub-18' },
];

// ---------- FUNÇÕES UTILITÁRIAS ----------
const useFade = (duration = 400, delay = 0) => {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [opacity, duration, delay]);
  return opacity;
};

const useSlideUp = (distance = 24, duration = 400, delay = 0) => {
  const translateY = useRef(new Animated.Value(distance)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, opacity, duration, delay]);
  return { translateY, opacity };
};

const useScaleIn = (duration = 450, delay = 0) => {
  const scale = useRef(new Animated.Value(0.88)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.elastic(1.2)),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale, opacity, duration, delay]);
  return { scale, opacity };
};

const PressableScale = ({ children, onPress, scaleTo = 0.96 }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const handlePressIn = () =>
    Animated.spring(scale, { toValue: scaleTo, useNativeDriver: true, friction: 6 }).start();
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6 }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ---------- COMPONENTES REUTILIZÁVEIS ----------
const Header = ({ title, subtitle, onBack }) => {
  const fade = useFade(500);
  const { translateY, opacity } = useSlideUp(16, 500, 120);
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        {onBack ? (
          <PressableScale onPress={onBack}>
            <View style={styles.backBtn}>
              <MaterialCommunityIcons name="arrow-left" size={22} color={theme.colors.text} />
            </View>
          </PressableScale>
        ) : (
          <View style={styles.backPlaceholder} />
        )}
        <View style={styles.headerRight}>
          <MaterialCommunityIcons name="account-circle" size={28} color={theme.colors.text} />
        </View>
      </View>
      <Animated.Text style={[styles.headerTitle, { opacity: fade }]}>{title}</Animated.Text>
      {subtitle ? (
        <Animated.Text
          style={[styles.headerSubtitle, { transform: [{ translateY }], opacity }]}
        >
          {subtitle}
        </Animated.Text>
      ) : null}
    </View>
  );
};

const FooterNav = ({ go }) => {
  const { translateY, opacity } = useSlideUp(24, 500, 250);
  return (
    <Animated.View style={[styles.footer, { transform: [{ translateY }], opacity }]}>
      <PressableScale onPress={() => go('live')}>
        <View style={styles.footerItem}>
          <MaterialCommunityIcons name="broadcast" size={26} color={theme.colors.subtext} />
          <Text style={styles.footerText}>Live</Text>
        </View>
      </PressableScale>
      <PressableScale onPress={() => go('biblioteca')}>
        <View style={styles.footerItem}>
          <MaterialCommunityIcons name="book-open-page-variant" size={26} color={theme.colors.subtext} />
          <Text style={styles.footerText}>Biblioteca</Text>
        </View>
      </PressableScale>
      <PressableScale onPress={() => go('perfil')}>
        <View style={styles.footerItem}>
          <MaterialCommunityIcons name="account-circle" size={26} color={theme.colors.subtext} />
          <Text style={styles.footerText}>Perfil</Text>
        </View>
      </PressableScale>
    </Animated.View>
  );
};

const SectionHeader = ({ icon, color, title, right }) => {
  const { translateY, opacity } = useSlideUp(18, 450, 80);
  return (
    <Animated.View style={[styles.sectionHeader, { transform: [{ translateY }], opacity }]}>
      <View style={styles.sectionLeft}>
        <MaterialCommunityIcons name={icon} size={22} color={color} />
        <Text style={[styles.sectionTitle, { color }]}>{title}</Text>
      </View>
      {right ? <View style={styles.sectionRight}>{right}</View> : null}
    </Animated.View>
  );
};

const CategoryCard = ({ icon, color, title, onPress }) => {
  const { scale, opacity } = useScaleIn(400, 120);
  return (
    <Animated.View style={{ transform: [{ scale }], opacity }}>
      <PressableScale onPress={onPress}>
        <View style={[styles.categoryCard, { borderColor: color }]}>
          <View style={[styles.categoryIconWrap, { backgroundColor: color + '22' }]}>
            <MaterialCommunityIcons name={icon} size={28} color={color} />
          </View>
          <Text style={[styles.categoryTitle, { color }]}>{title}</Text>
        </View>
      </PressableScale>
    </Animated.View>
  );
};

const InfoCard = ({ icon, color, title, desc }) => {
  const { translateY, opacity } = useSlideUp(20, 480, 100);
  return (
    <Animated.View style={[styles.infoCard, { transform: [{ translateY }], opacity }]}>
      <View style={styles.infoLeft}>
        <View style={[styles.infoIconWrap, { backgroundColor: color + '22' }]}>
          <MaterialCommunityIcons name={icon} size={22} color={color} />
        </View>
      </View>
      <View style={styles.infoContent}>
        <Text style={[styles.infoTitle, { color }]}>{title}</Text>
        <Text style={styles.infoDesc}>{desc}</Text>
      </View>
    </Animated.View>
  );
};

const HighlightCard = ({ item, index = 0 }) => {
  const transX = useRef(new Animated.Value(24)).current;
  const op = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(transX, {
        toValue: 0,
        duration: 480,
        delay: index * 100,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(op, {
        toValue: 1,
        duration: 480,
        delay: index * 100,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [transX, op, index]);

  return (
    <Animated.View style={[styles.highlightCard, { transform: [{ translateX: transX }], opacity: op }]}>
      <Image source={{ uri: item.imagem }} style={styles.highlightImage} />
      <View style={styles.highlightText}>
        <Text style={styles.highlightTitle}>{item.titulo}</Text>
        <Text style={styles.highlightDesc}>{item.descricao}</Text>
      </View>
    </Animated.View>
  );
};

// ---------- TELAS ----------
const HomeScreen = ({ go }) => {
  const scroller = useRef(new Animated.Value(0)).current;
  const parallax = scroller.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <Header title="Basquete Social" subtitle="Escolha uma área para crescer com o esporte" />
      <Animated.ScrollView
        style={styles.scroll}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scroller } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
      >
        <Animated.View style={{ transform: [{ translateY: parallax }] }}>
          <SectionHeader icon="grid" color={theme.colors.text} title="Categorias" />
          <View style={styles.categoryGrid}>
            {categorias.map((c, i) => (
              <CategoryCard
                key={i}
                icon={c.icone}
                color={c.cor}
                title={c.nome}
                onPress={() => go(c.rota)}
              />
            ))}
          </View>
        </Animated.View>

        <SectionHeader icon="star" color={theme.colors.text} title="Destaques" />
        {destaqueData.map((d, i) => (
          <HighlightCard key={i} item={d} index={i} />
        ))}

        <View style={styles.spaceBottom} />
      </Animated.ScrollView>

      <FooterNav go={go} />
    </View>
  );
};

const TreinosScreen = ({ go }) => {
  return (
    <View style={styles.screen}>
      <Header title="Agenda de Treinos" subtitle="Participe e evolua com a equipe" onBack={() => go('home')} />
      <ScrollView style={styles.scroll}>
        <SectionHeader icon="clock-outline" color={theme.colors.primary} title="Próximos treinos" />
        {agendaTreinos.map((t, i) => (
          <InfoCard key={i} icon={t.icon} color={t.color} title={t.title} desc={t.desc} />
        ))}

        <SectionHeader icon="chart-timeline" color={theme.colors.primary} title="Sugestões de rotina" />
        <InfoCard icon="arm-flex" color={theme.colors.primary} title="Fortalecimento" desc="3x por semana — foco core e membros inferiores" />
        <InfoCard icon="timer" color={theme.colors.primary} title="Alongamentos" desc="10 minutos pré e pós treino" />

        <View style={styles.spaceBottom} />
      </ScrollView>
      <FooterNav go={go} />
    </View>
  );
};

const MentoriaScreen = ({ go }) => {
  return (
    <View style={styles.screen}>
      <Header title="Mentoria Esportiva" subtitle="Conecte-se com quem puxa você pra cima" onBack={() => go('home')} />
      <ScrollView style={styles.scroll}>
        <SectionHeader icon="account-tie" color={theme.colors.secondary} title="Mentores e sessões" />
        {mentoriaCards.map((m, i) => (
          <InfoCard key={i} icon={m.icon} color={m.color} title={m.title} desc={m.desc} />
        ))}

        <SectionHeader icon="calendar-check" color={theme.colors.secondary} title="Próximos passos" />
        <InfoCard icon="email-check" color={theme.colors.secondary} title="Confirmação" desc="Aguardando confirmação do aluno" />
        <InfoCard icon="map-marker" color={theme.colors.secondary} title="Local" desc="Starbucks - Av. Paulista" />

        <View style={styles.spaceBottom} />
      </ScrollView>
      <FooterNav go={go} />
    </View>
  );
};

const EducacaoScreen = ({ go }) => {
  return (
    <View style={styles.screen}>
      <Header title="Educação pelo Esporte" subtitle="Aprenda, lidere e inspire" onBack={() => go('home')} />
      <ScrollView style={styles.scroll}>
        <SectionHeader icon="book-education" color={theme.colors.blue} title="Cursos e bolsas" />
        {educacaoCards.map((e, i) => (
          <InfoCard key={i} icon={e.icon} color={e.color} title={e.title} desc={e.desc} />
        ))}

        <SectionHeader icon="lightbulb-on" color={theme.colors.blue} title="Projetos e estudos" />
        <InfoCard icon="account-school" color={theme.colors.blue} title="Mentoria acadêmica" desc="Orientação para conciliar estudos e treino" />
        <InfoCard icon="clipboard-text" color={theme.colors.blue} title="Trilhas de leitura" desc="Seleção de textos para lideranças" />

        <View style={styles.spaceBottom} />
      </ScrollView>
      <FooterNav go={go} />
    </View>
  );
};

const OportunidadesScreen = ({ go }) => {
  return (
    <View style={styles.screen}>
      <Header title="Oportunidades" subtitle="Vagas, cursos e apoio pra você avançar" onBack={() => go('home')} />
      <ScrollView style={styles.scroll}>
        <SectionHeader icon="briefcase" color={theme.colors.purple} title="Acesso a oportunidades" />
        {oportunidadesCards.map((o, i) => (
          <InfoCard key={i} icon={o.icon} color={o.color} title={o.title} desc={o.desc} />
        ))}

        <SectionHeader icon="shield-check" color={theme.colors.purple} title="Parcerias e benefícios" />
        <InfoCard icon="handshake" color={theme.colors.purple} title="ONGs e empresas" desc="Parceiros que acreditam no poder do esporte" />
        <InfoCard icon="cash" color={theme.colors.purple} title="Auxílio transporte" desc="Apoio para deslocamento aos treinos" />

        <View style={styles.spaceBottom} />
      </ScrollView>
      <FooterNav go={go} />
    </View>
  );
};

const LiveScreen = ({ go }) => {
  return (
    <View style={styles.screen}>
      <Header title="Transmissões ao Vivo" subtitle="Treinos, torneios e entrevistas em tempo real" onBack={() => go('home')} />
      <ScrollView style={styles.scroll}>
        <SectionHeader icon="video" color={theme.colors.accent} title="Lives" />
        {liveCards.map((l, i) => (
          <InfoCard key={i} icon={l.icon} color={l.color} title={l.title} desc={l.desc} />
        ))}

        <SectionHeader icon="clock-outline" color={theme.colors.accent} title="Agenda" />
        <InfoCard icon="calendar-multiple" color={theme.colors.accent} title="Calendário" desc="Confira as próximas transmissões" />

        <View style={styles.spaceBottom} />
      </ScrollView>
      <FooterNav go={go} />
    </View>
  );
};

const BibliotecaScreen = ({ go }) => {
  return (
    <View style={styles.screen}>
      <Header title="Biblioteca" subtitle="Conteúdos educativos e inspiradores" onBack={() => go('home')} />
      <ScrollView style={styles.scroll}>
        <SectionHeader icon="book-open-page-variant" color={theme.colors.info} title="Conteúdos" />
        {bibliotecaCards.map((b, i) => (
          <InfoCard key={i} icon={b.icon} color={b.color} title={b.title} desc={b.desc} />
        ))}

        <SectionHeader icon="playlist-check" color={theme.colors.info} title="Playlists e leituras" />
        <InfoCard icon="bookmark-check" color={theme.colors.info} title="Favoritos" desc="Salve o que te inspira" />

        <View style={styles.spaceBottom} />
      </ScrollView>
      <FooterNav go={go} />
    </View>
  );
};

const PerfilScreen = ({ go }) => {
  return (
    <View style={styles.screen}>
      <Header title="Meu Perfil" subtitle="Henzo — atleta e mentor em formação" onBack={() => go('home')} />
      <ScrollView style={styles.scroll}>
        <SectionHeader icon="account" color={theme.colors.ok} title="Informações" />
        {perfilCards.map((p, i) => (
          <InfoCard key={i} icon={p.icon} color={p.color} title={p.title} desc={p.desc} />
        ))}

        <SectionHeader icon="trophy" color={theme.colors.ok} title="Metas" />
        <InfoCard icon="calendar-check" color={theme.colors.ok} title="Compromissos" desc="Treinar 4x por semana — foco em fundamentos" />

        <View style={styles.spaceBottom} />
      </ScrollView>
      <FooterNav go={go} />
    </View>
  );
};

// ---------- ROOT ----------
export default function App() {
  const [tela, setTela] = useState('home');

  const go = (route) => {
    // Transição simples: fade-out + troca de tela + fade-in
    setTela(route);
  };

  const Screen = useMemo(() => {
    switch (tela) {
      case 'home':
        return <HomeScreen go={go} />;
      case 'treinos':
        return <TreinosScreen go={go} />;
      case 'mentoria':
        return <MentoriaScreen go={go} />;
      case 'educacao':
        return <EducacaoScreen go={go} />;
      case 'oportunidades':
        return <OportunidadesScreen go={go} />;
      case 'live':
        return <LiveScreen go={go} />;
      case 'biblioteca':
        return <BibliotecaScreen go={go} />;
      case 'perfil':
        return <PerfilScreen go={go} />;
      default:
        return <HomeScreen go={go} />;
    }
  }, [tela]);

  // Fade geral da tela
  const opacity = useFade(350);
  const { translateY } = useSlideUp(12, 350);

  return (
    <Animated.View style={[styles.app, { opacity, transform: [{ translateY }] }]}>
      {Screen}
    </Animated.View>
  );
}

// ---------- ESTILOS ----------
const styles = StyleSheet.create({

app: {
  flex: 1,
  backgroundColor: theme.colors.bg,
  maxWidth: Platform.OS === 'web' ? 1200 : '100%',
  alignSelf: Platform.OS === 'web' ? 'center' : 'auto',
},
categoryGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: Platform.OS === 'web' ? 'flex-start' : 'space-between',
  gap: Platform.OS === 'web' ? 20 : theme.spacing(1.5),
},
categoryCard: {
  width: Platform.OS === 'web'
    ? '23%' // 4 colunas no web
    : (width - theme.spacing(4) - theme.spacing(1.5)) / 2,
  cursor: Platform.OS === 'web' ? 'pointer' : 'default',
},
footer: {
  position: Platform.OS === 'web' ? 'fixed' : 'relative',
  bottom: Platform.OS === 'web' ? 0 : 'auto',
  width: Platform.OS === 'web' ? '100%' : 'auto',
},


  app: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },

  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },

  scroll: {
    paddingHorizontal: theme.spacing(2),
  },

  // Header
  header: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    paddingHorizontal: theme.spacing(2),
    backgroundColor: theme.colors.bg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  backBtn: {
    padding: theme.spacing(1.5),
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.softCard,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  backPlaceholder: {
    width: 44,
    height: 44,
  },
  headerRight: {
    marginLeft: 'auto',
    padding: theme.spacing(1.5),
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.softCard,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.text,
  },
  headerSubtitle: {
    marginTop: theme.spacing(1),
    fontSize: 14,
    color: theme.colors.subtext,
  },

  // Sections
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  sectionLeft: {
    flexDirection: 'row',
    gap: theme.spacing(1),
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  sectionRight: {},

  // Category grid
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing(1.5),
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  categoryCard: {
    width: (width - theme.spacing(4) - theme.spacing(1.5)) / 2,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(2),
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '700',
  },

  // Info Card
  infoCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.softCard,
    borderRadius: theme.radius.md,
    padding: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing(1.5),
  },
  infoLeft: {
    paddingRight: theme.spacing(1.5),
  },
  infoIconWrap: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: theme.spacing(0.5),
  },
  infoDesc: {
    fontSize: 14,
    color: theme.colors.subtext,
  },

  // Highlight Card
  highlightCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  highlightImage: {
    width: 110,
    height: 110,
  },
  highlightText: {
    flex: 1,
    padding: theme.spacing(2),
    justifyContent: 'center',
  },
  highlightTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: theme.spacing(0.5),
  },
  highlightDesc: {
    color: theme.colors.subtext,
    fontSize: 14,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(2),
    justifyContent: 'space-around',
    padding: theme.spacing(1.5),
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.bg,
  },
  footerItem: {
    alignItems: 'center',
    gap: theme.spacing(0.5),
  },
  footerText: {
    fontSize: 12,
    color: theme.colors.subtext,
  },

  spaceBottom: {
    height: theme.spacing(6),
  },
});
