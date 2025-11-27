// App.js — Hoop Bridge (arquivo único completo e expandido)
// Henzo, este arquivo traz:
// - Navegação por estado entre telas (Home, Treinos, Mentoria, Educação, Oportunidades, Live, Biblioteca, Objetivo do App, Sobre mim)
// - Telas com personalidades visuais próprias (cores, layouts e microinterações diferentes)
// - Animações (fade, slide, scale, parallax, press effects, pulse, shimmer)
// - Componentes reutilizáveis (Header, FooterNav, CategoryCard, InfoCard, HighlightCard, Banner, Divider, Chip, StatCard, GradientCard, FeatureList)
// - Ícones (MaterialCommunityIcons) e tema global
// - Mock de dados ampliado e funções utilitárias
// - Transições suaves e detalhes gráficos (sombra, “gradiente” simulado, cantos arredondados, separadores)
// - Tudo dentro de um único App.js, sem dependências externas além do React Native + Expo Icons

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
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// -----------------------------------------------------------------------------
// Configuração de dimensões
// -----------------------------------------------------------------------------
const { width, height } = Dimensions.get('window');

// -----------------------------------------------------------------------------
// Tema global (cores, espaçamento, arredondamento)
// -----------------------------------------------------------------------------
const theme = {
  colors: {
    // base
    bg: '#0f141b',
    card: '#1a2029',
    softCard: '#212a35',
    text: '#e6edf3',
    subtext: '#9aa8b5',
    border: '#2a3440',

    // paletas por tela
    primary: '#f57c00',   // Treinos - energia
    secondary: '#4caf50', // Mentoria - acolhimento
    blue: '#2196f3',      // Educação - acadêmico
    purple: '#9c27b0',    // Oportunidades - ambição
    accent: '#ff5722',    // Live - vibrante
    info: '#60a5fa',      // Biblioteca - suave
    ok: '#22c55e',        // Objetivo do App - equilíbrio

    // extras
    warn: '#f59e0b',
    danger: '#ef4444',
    muted: '#64748b',
    badge: '#334155',
    overlay: '#0b1118',
  },
  spacing: (n) => n * 8,
  radius: { sm: 10, md: 14, lg: 20, xl: 28 },
  shadow: {
    card: {
      shadowColor: '#000',
      shadowOpacity: 0.16,
      shadowRadius: 10,
      elevation: 6,
    },
    soft: {
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
    },
  },
};

// -----------------------------------------------------------------------------
// Mocks de dados ampliados
// -----------------------------------------------------------------------------
const destaqueData = [
  {
    titulo: 'Mentoria com Ana B.',
    descricao: 'Direção e ação para crescer com propósito.',
    imagem: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    tag: 'Mentoria',
  },
  {
    titulo: 'Torneio Sub-18',
    descricao: 'Seleção aberta para atletas jovens.',
    // imagem atualizada para URL externa fornecida pelo usuário
    imagem: 'https://st.depositphotos.com/1020070/55876/v/450/depositphotos_558760594-stock-illustration-basketball-championship-icon-player-sport.jpg',
    tag: 'Oportunidade',
  },
];

const categorias = [
  { nome: 'Treinos', icone: 'basketball', cor: theme.colors.primary, rota: 'treinos', desc: 'Agenda, rotinas e preparo' },
  { nome: 'Mentoria', icone: 'account-group', cor: theme.colors.secondary, rota: 'mentoria', desc: 'Conexão e evolução pessoal' },
  { nome: 'Oportunidades', icone: 'briefcase', cor: theme.colors.purple, rota: 'oportunidades', desc: 'Vagas e parcerias' },
  { nome: 'Educação', icone: 'school', cor: theme.colors.blue, rota: 'educacao', desc: 'Cursos, bolsas e projetos' },
];

const agendaTreinos = [
  { icon: 'run', title: 'Fundamentos', desc: '20/11 às 10h — Quadra Central', color: theme.colors.primary },
  { icon: 'whistle', title: 'Tático', desc: '22/11 às 14h — Ginásio Municipal', color: theme.colors.primary },
  { icon: 'dumbbell', title: 'Condicionamento', desc: '25/11 às 16h — Academia Parceira', color: theme.colors.primary },
  { icon: 'foot-print', title: 'Agilidade', desc: '27/11 às 09h — Campo Aberto', color: theme.colors.primary },
  { icon: 'meditation', title: 'Mindset de Jogo', desc: '29/11 às 15h — Sala 02', color: theme.colors.primary },
];

const mentoriaCards = [
  { icon: 'account-tie', color: theme.colors.secondary, title: 'Ana Beatriz', desc: 'Mentora em liderança esportiva' },
  { icon: 'account', color: theme.colors.secondary, title: 'Gabriel Santos', desc: 'Aluno aguardando confirmação' },
  { icon: 'calendar', color: theme.colors.secondary, title: 'Sessão 01/07 - 11:00', desc: 'Starbucks - Av. Paulista' },
  { icon: 'map-marker', color: theme.colors.secondary, title: 'Sala Comunitária', desc: 'Rua Esperança, 120' },
];

const educacaoCards = [
  { icon: 'school', color: theme.colors.blue, title: 'Curso de Liderança', desc: 'Formação para jovens líderes esportivos' },
  { icon: 'book-open', color: theme.colors.blue, title: 'Bolsas de Estudo', desc: 'Parcerias com escolas e universidades' },
  { icon: 'lightbulb-on', color: theme.colors.blue, title: 'Projeto de Pesquisa', desc: 'Basquete e cidadania' },
  { icon: 'library', color: theme.colors.blue, title: 'Leituras Fundamentais', desc: 'Clássicos e contemporâneos' },
  { icon: 'calendar-multiple', color: theme.colors.blue, title: 'Agenda Acadêmica', desc: 'Seminários e workshops' },
];

const oportunidadesCards = [
  { icon: 'briefcase', color: theme.colors.purple, title: 'Monitor de Quadra', desc: 'ONG Esporte+ está contratando' },
  { icon: 'book', color: theme.colors.purple, title: 'Curso de Treinamento', desc: 'Capacitação para jovens líderes' },
  { icon: 'heart-pulse', color: theme.colors.purple, title: 'Atendimento Saúde', desc: 'Fisioterapia gratuita para atletas' },
  { icon: 'cash', color: theme.colors.purple, title: 'Auxílio Transporte', desc: 'Apoio financeiro para deslocamento' },
  { icon: 'handshake', color: theme.colors.purple, title: 'Parcerias Locais', desc: 'Empresas que apoiam o esporte' },
];

const liveCards = [
  { icon: 'video', color: theme.colors.accent, title: 'Torneio Sub-18', desc: 'Hoje às 18h — transmissão ao vivo' },
  { icon: 'microphone', color: theme.colors.accent, title: 'Entrevista c/ Mentor', desc: 'Amanhã às 20h — live exclusiva' },
  { icon: 'podcast', color: theme.colors.accent, title: 'Mesa redonda', desc: 'Quinta — 19h' },
];

const bibliotecaCards = [
  { icon: 'book-open-page-variant', color: theme.colors.info, title: 'Ebook: Basquete e Cidadania', desc: 'O esporte como ferramenta social' },
  { icon: 'headphones', color: theme.colors.info, title: 'Podcast: Superação', desc: 'Vozes que mudaram de vida nas quadras' },
  { icon: 'video', color: theme.colors.info, title: 'Documentário', desc: 'Histórias reais de transformação' },
  { icon: 'newspaper', color: theme.colors.info, title: 'Artigo: Liderança Jovem', desc: 'Estudos e práticas atuais' },
  { icon: 'files', color: theme.colors.info, title: 'Materiais Didáticos', desc: 'PDFs e slides' },
];

// Objetivo do App (substitui Perfil)
const objetivoAppBullets = [
  { icon: 'handshake', color: theme.colors.ok, title: 'Conectar', desc: 'Criar pontes entre pessoas e oportunidades' },
  { icon: 'school', color: theme.colors.ok, title: 'Educar', desc: 'Aprender e ensinar com o esporte' },
  { icon: 'account-group', color: theme.colors.ok, title: 'Incluir', desc: 'Fortalecer comunidades e vencer barreiras' },
  { icon: 'basketball', color: theme.colors.ok, title: 'Transformar', desc: 'Usar o basquete como elo da sociedade' },
];

// -----------------------------------------------------------------------------
// Hooks de animação
// -----------------------------------------------------------------------------
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

const usePulse = (min = 0.96, max = 1.04, duration = 900) => {
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: max, duration: duration / 2, useNativeDriver: true }),
        Animated.timing(scale, { toValue: min, duration: duration / 2, useNativeDriver: true }),
      ])
    ).start();
  }, [scale, min, max, duration]);
  return scale;
};

const useShimmer = (widthVal = width * 0.8, duration = 1500) => {
  const transX = useRef(new Animated.Value(-widthVal)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(transX, {
        toValue: widthVal,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [transX, widthVal, duration]);
  return transX;
};

// -----------------------------------------------------------------------------
// Press effect (com animação de toque)
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// Componentes auxiliares
// -----------------------------------------------------------------------------
const Divider = ({ color = theme.colors.border, inset = 0, opacity = 0.8 }) => (
  <View style={{ height: 1, backgroundColor: color, opacity, marginHorizontal: inset }} />
);

const Chip = ({ label, icon, color = theme.colors.badge, textColor = theme.colors.text }) => {
  const { scale, opacity } = useScaleIn(360, 80);
  return (
    <Animated.View style={[styles.chip, { backgroundColor: color, transform: [{ scale }], opacity }]}>
      {icon ? <MaterialCommunityIcons name={icon} size={16} color={textColor} /> : null}
      <Text style={[styles.chipText, { color: textColor }]}>{label}</Text>
    </Animated.View>
  );
};

const Banner = ({ title, subtitle, color = theme.colors.card, icon }) => {
  const { translateY, opacity } = useSlideUp(18, 400, 80);
  return (
    <Animated.View style={[styles.banner, { backgroundColor: color, transform: [{ translateY }], opacity }]}>
      <View style={styles.bannerLeft}>
        {icon ? (
          <View style={[styles.bannerIconWrap, { backgroundColor: theme.colors.bg }]}>
            <MaterialCommunityIcons name={icon} size={26} color={theme.colors.text} />
          </View>
        ) : null}
      </View>
      <View style={styles.bannerContent}>
        <Text style={styles.bannerTitle}>{title}</Text>
        {subtitle ? <Text style={styles.bannerSubtitle}>{subtitle}</Text> : null}
      </View>
    </Animated.View>
  );
};

const StatCard = ({ label, value, icon, color }) => {
  const { translateY, opacity } = useSlideUp(16, 420, 120);
  return (
    <Animated.View style={[styles.statCard, { borderColor: color, transform: [{ translateY }], opacity }]}>
      <View style={[styles.statIconWrap, { backgroundColor: color + '22' }]}>
        <MaterialCommunityIcons name={icon} size={20} color={color} />
      </View>
      <View style={styles.statContent}>
        <Text style={[styles.statValue, { color }]}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </Animated.View>
  );
};

const GradientCard = ({ title, subtitle, leftIcon, colors = [theme.colors.card, theme.colors.softCard] }) => {
  const transX = useShimmer(width * 0.7);
  return (
    <View style={[styles.gradientCard, { backgroundColor: colors[0], overflow: 'hidden' }]}>
      <View style={styles.gradientRow}>
        {leftIcon ? (
          <View style={[styles.gradientIconWrap, { backgroundColor: colors[1] }]}>
            <MaterialCommunityIcons name={leftIcon} size={24} color={theme.colors.text} />
          </View>
        ) : null}
        <View style={styles.gradientContent}>
          <Text style={styles.gradientTitle}>{title}</Text>
          {subtitle ? <Text style={styles.gradientSubtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      <Animated.View style={[styles.gradientShimmer, { transform: [{ translateX: transX }] }]} />
    </View>
  );
};

const FeatureList = ({ items, color }) => {
  return (
    <View style={styles.featureList}>
      {items.map((it, i) => (
        <View key={i} style={styles.featureItem}>
          <MaterialCommunityIcons name="check-circle" size={18} color={color} />
          <Text style={styles.featureText}>{it}</Text>
        </View>
      ))}
    </View>
  );
};

// -----------------------------------------------------------------------------
// Componentes reutilizáveis principais
// -----------------------------------------------------------------------------
const Header = ({ title, subtitle, onBack, tone = theme.colors.text, onAbout }) => {
  const fade = useFade(500);
  const { translateY, opacity } = useSlideUp(16, 500, 120);
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        {onBack ? (
          <PressableScale onPress={onBack}>
            <View style={styles.backBtn}>
              <MaterialCommunityIcons name="arrow-left" size={22} color={tone} />
            </View>
          </PressableScale>
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        <View style={styles.headerRight}>
          <PressableScale onPress={onAbout}>
            <View style={styles.aboutBtn}>
              <Text style={styles.aboutBtnText}>Sobre mim</Text>
            </View>
          </PressableScale>
        </View>
      </View>

      <Animated.Text style={[styles.headerTitle, { opacity: fade, color: tone }]}>{title}</Animated.Text>
      {subtitle ? (
        <Animated.Text style={[styles.headerSubtitle, { transform: [{ translateY }], opacity }]}>{subtitle}</Animated.Text>
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
      <PressableScale onPress={() => go('objetivo')}>
        <View style={styles.footerItem}>
          <MaterialCommunityIcons name="target" size={26} color={theme.colors.subtext} />
          <Text style={styles.footerText}>Objetivo do App</Text>
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

const CategoryCard = ({ icon, color, title, desc, onPress }) => {
  const { scale, opacity } = useScaleIn(400, 120);
  return (
    <Animated.View style={{ transform: [{ scale }], opacity }}>
      <PressableScale onPress={onPress}>
        <View style={[styles.categoryCard, { borderColor: color }]}>
          <View style={[styles.categoryIconWrap, { backgroundColor: color + '22' }]}>
            <MaterialCommunityIcons name={icon} size={28} color={color} />
          </View>
          <View style={styles.categoryTextBlock}>
            <Text style={[styles.categoryTitle, { color }]}>{title}</Text>
            {desc ? <Text style={styles.categoryDesc}>{desc}</Text> : null}
          </View>
        </View>
      </PressableScale>
    </Animated.View>
  );
};

const InfoCard = ({ icon, color, title, desc, badge }) => {
  const { translateY, opacity } = useSlideUp(20, 480, 100);
  return (
    <Animated.View style={[styles.infoCard, { transform: [{ translateY }], opacity }]}>
      <View style={styles.infoLeft}>
        <View style={[styles.infoIconWrap, { backgroundColor: color + '22' }]}>
          <MaterialCommunityIcons name={icon} size={22} color={color} />
        </View>
      </View>
      <View style={styles.infoContent}>
        <View style={styles.infoHeaderRow}>
          <Text style={[styles.infoTitle, { color }]}>{title}</Text>
          {badge ? <Chip label={badge} icon="tag-outline" color={theme.colors.badge} textColor={theme.colors.text} /> : null}
        </View>
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
        <View style={styles.highlightTopRow}>
          <Text style={styles.highlightTitle}>{item.titulo}</Text>
          <Chip label={item.tag} icon="star-outline" />
        </View>
        <Text style={styles.highlightDesc}>{item.descricao}</Text>
      </View>
    </Animated.View>
  );
};

// -----------------------------------------------------------------------------
// Telas com personalidade própria
// -----------------------------------------------------------------------------

// HOME — vitrine com parallax, categorias e destaques
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
      <Header
        title="Hoop Bridge"
        subtitle="O basquete como ponte para oportunidades e transformação"
        tone={theme.colors.text}
        onAbout={() => go('sobremim')}
      />

      <Animated.ScrollView
        style={styles.scroll}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scroller } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
      >
        <Banner
          title="Construa sua ponte"
          subtitle="Treinos, mentoria e conhecimento ao seu alcance"
          color={theme.colors.card}
          icon="bridge"
        />

        <Animated.View style={{ transform: [{ translateY: parallax }] }}>
          <SectionHeader icon="grid" color={theme.colors.text} title="Categorias" />
          <View style={styles.categoryGrid}>
            {categorias.map((c, i) => (
              <CategoryCard
                key={i}
                icon={c.icone}
                color={c.cor}
                title={c.nome}
                desc={c.desc}
                onPress={() => go(c.rota)}
              />
            ))}
          </View>
        </Animated.View>

        <SectionHeader icon="star" color={theme.colors.text} title="Destaques" />
        {destaqueData.map((d, i) => (
          <HighlightCard key={i} item={d} index={i} />
        ))}

        <GradientCard
          title="Pontes reais, histórias reais"
          subtitle="Atletas, mentores e comunidades conectadas pelo jogo"
          leftIcon="account-group"
          colors={[theme.colors.softCard, theme.colors.card]}
        />

        <Divider inset={theme.spacing(2)} />

        <SectionHeader
          icon="information-outline"
          color={theme.colors.text}
          title="Por que o Hoop Bridge?"
          right={<Chip label="Novo" icon="sparkles" color={theme.colors.badge} />}
        />
        <View style={styles.infoBlock}>
          <Text style={styles.infoBlockText}>
            Acreditamos no basquete como linguagem universal. Aqui, cada passo no treino vira avanço na
            vida, e cada conexão abre uma ponte para o seu futuro.
          </Text>
        </View>

        <View style={styles.spaceBottom} />
      </Animated.ScrollView>

      <FooterNav go={go} />
    </View>
  );
};

// TREINOS — energia, cards fortes, rotina e metas
const TreinosScreen = ({ go }) => {
  const pulse = usePulse();

  return (
    <View style={styles.treinosScreen}>
      <Header
        title="Agenda de Treinos"
        subtitle="Participe e evolua com a equipe"
        onBack={() => go('home')}
        tone={theme.colors.primary}
        onAbout={() => go('sobremim')}
      />

      <Animated.View style={[styles.treinosTopBadge, { transform: [{ scale: pulse }] }]}>
        <MaterialCommunityIcons name="fire" size={18} color={theme.colors.primary} />
        <Text style={[styles.treinosTopBadgeText, { color: theme.colors.primary }]}>Foco da Semana</Text>
      </Animated.View>

      <ScrollView style={styles.scroll}>
        <Banner
          title="Fundamentos acima de tudo"
          subtitle="Drible, passe, arremesso e defesa"
          color="#fff3e00f"
          icon="run-fast"
        />

        <SectionHeader icon="clock-outline" color={theme.colors.primary} title="Próximos treinos" />
        {agendaTreinos.map((t, i) => (
          <InfoCard key={i} icon={t.icon} color={t.color} title={t.title} desc={t.desc} badge="Oficial" />
        ))}

        <SectionHeader icon="chart-timeline" color={theme.colors.primary} title="Sugestões de rotina" />
        <InfoCard
          icon="arm-flex"
          color={theme.colors.primary}
          title="Fortalecimento"
          desc="3x por semana — foco core e membros inferiores"
        />
        <InfoCard icon="timer" color={theme.colors.primary} title="Alongamentos" desc="10 minutos pré e pós treino" />
        <InfoCard icon="water" color={theme.colors.primary} title="Hidratação" desc="Mantenha-se pronto para competir" />

        <Divider inset={theme.spacing(2)} />

        <SectionHeader icon="trophy" color={theme.colors.primary} title="Metas e progresso" />
        <View style={styles.statsRow}>
          <StatCard label="Treinos no mês" value="12" icon="calendar" color={theme.colors.primary} />
          <StatCard label="Arremessos feitos" value="750" icon="target" color={theme.colors.primary} />
          <StatCard label="Agilidade" value="+8%" icon="speedometer" color={theme.colors.primary} />
        </View>

        <View style={styles.spaceBottom} />
      </ScrollView>

      <FooterNav go={go} />
    </View>
  );
};

// MENTORIA — acolhedor, lista de mentores, próximos passos
const MentoriaScreen = ({ go }) => {
  return (
    <View style={styles.mentoriaScreen}>
      <Header
        title="Mentoria Esportiva"
        subtitle="Conecte-se com quem puxa você pra cima"
        onBack={() => go('home')}
        tone={theme.colors.secondary}
        onAbout={() => go('sobremim')}
      />

      <ScrollView style={styles.scroll}>
        <Banner
          title="Crescer é ação com direção"
          subtitle="Mentoria que te ajuda a decidir e agir"
          color="#e8f5e90f"
          icon="leaf"
        />

        <SectionHeader icon="account-tie" color={theme.colors.secondary} title="Mentores e sessões" />
        {mentoriaCards.map((m, i) => (
          <InfoCard key={i} icon={m.icon} color={m.color} title={m.title} desc={m.desc} />
        ))}

        <SectionHeader icon="calendar-check" color={theme.colors.secondary} title="Próximos passos" />
        <InfoCard icon="email-check" color={theme.colors.secondary} title="Confirmação" desc="Aguardando confirmação do aluno" />
        <InfoCard icon="map-marker" color={theme.colors.secondary} title="Local" desc="Starbucks - Av. Paulista" />
        <InfoCard icon="chat-processing" color={theme.colors.secondary} title="Checklist" desc="Objetivos, rotina e compromisso" />

        <Divider inset={theme.spacing(2)} />

        <SectionHeader icon="hand-heart" color={theme.colors.secondary} title="Princípios" />
        <View style={styles.infoBlock}>
          <Text style={styles.infoBlockText}>
            Respeito, esforço e constância. Mentoria é sobre ver longe e caminhar perto, com quem acredita
            no seu potencial.
          </Text>
        </View>

        <View style={styles.spaceBottom} />
      </ScrollView>

      <FooterNav go={go} />
    </View>
  );
};

// EDUCAÇÃO — acadêmico, grid de cursos e trilhas
const EducacaoScreen = ({ go }) => {
  return (
    <View style={styles.educacaoScreen}>
      <Header
        title="Educação pelo Esporte"
        subtitle="Aprenda, lidere e inspire"
        onBack={() => go('home')}
        tone={theme.colors.blue}
        onAbout={() => go('sobremim')}
      />

      <ScrollView style={styles.scroll}>
        <Banner title="Conhecimento abre portas" subtitle="Cursos e bolsas para seu futuro" color="#e3f2fd0f" icon="school" />

        <SectionHeader icon="book-education" color={theme.colors.blue} title="Cursos e bolsas" />
        {educacaoCards.map((e, i) => (
          <InfoCard key={i} icon={e.icon} color={e.color} title={e.title} desc={e.desc} />
        ))}

        <SectionHeader icon="lightbulb-on" color={theme.colors.blue} title="Projetos e estudos" />
        <InfoCard
          icon="account-school"
          color={theme.colors.blue}
          title="Mentoria acadêmica"
          desc="Orientação para conciliar estudos e treino"
        />
        <InfoCard icon="book-open" color={theme.colors.blue} title="Trilhas de leitura" desc="Seleção de textos para lideranças" />
        <InfoCard icon="clipboard-text" color={theme.colors.blue} title="Plano de estudos" desc="Metas semanais e revisão" />

        <Divider inset={theme.spacing(2)} />

        <SectionHeader icon="library" color={theme.colors.blue} title="Valores" />
        <View style={styles.infoBlock}>
          <Text style={styles.infoBlockText}>
            Aprender, pensar, praticar e ensinar. O esporte como ponte para educação, e educação como motor
            para o esporte.
          </Text>
        </View>

        <View style={styles.spaceBottom} />
      </ScrollView>

      <FooterNav go={go} />
    </View>
  );
};

// OPORTUNIDADES — corporativo, timeline e benefícios
const OportunidadesScreen = ({ go }) => {
  return (
    <View style={styles.oportunidadesScreen}>
      <Header
        title="Oportunidades"
        subtitle="Vagas, cursos e apoio pra você avançar"
        onBack={() => go('home')}
        tone={theme.colors.purple}
        onAbout={() => go('sobremim')}
      />

      <ScrollView style={styles.scroll}>
        <Banner title="Portas abertas" subtitle="Parcerias e vagas perto de você" color="#9c27b00f" icon="briefcase" />

        <SectionHeader icon="briefcase" color={theme.colors.purple} title="Acesso a oportunidades" />
        {oportunidadesCards.map((o, i) => (
          <InfoCard key={i} icon={o.icon} color={o.color} title={o.title} desc={o.desc} />
        ))}

        <SectionHeader icon="shield-check" color={theme.colors.purple} title="Parcerias e benefícios" />
        <InfoCard icon="handshake" color={theme.colors.purple} title="ONGs e empresas" desc="Parceiros que acreditam no poder do esporte" />
        <InfoCard icon="cash" color={theme.colors.purple} title="Auxílio transporte" desc="Apoio para deslocamento aos treinos" />
        <InfoCard icon="school-outline" color={theme.colors.purple} title="Cursos subsidiados" desc="Formações técnicas com desconto" />

        <Divider inset={theme.spacing(2)} />

        <SectionHeader icon="timeline-text" color={theme.colors.purple} title="Como participar" />
        <View style={styles.infoBlock}>
          <Text style={styles.infoBlockText}>
            Preencha seu perfil, escolha a área de interesse e acompanhe as vagas publicadas. A oportunidade
            só precisa de um primeiro passo.
          </Text>
        </View>

        <View style={styles.spaceBottom} />
      </ScrollView>

      <FooterNav go={go} />
    </View>
  );
};

// LIVE — vibrante, player simulado, agenda
const LiveScreen = ({ go }) => {
  const pulse = usePulse(0.98, 1.03, 1200);

  return (
    <View style={styles.liveScreen}>
      <Header
        title="Transmissões ao Vivo"
        subtitle="Treinos, torneios e entrevistas em tempo real"
        onBack={() => go('home')}
        tone={theme.colors.accent}
        onAbout={() => go('sobremim')}
      />

      <ScrollView style={styles.scroll}>
        <Animated.View style={[styles.liveHero, { transform: [{ scale: pulse }] }]}>
          <View style={styles.liveHeroLeft}>
            <MaterialCommunityIcons name="play-circle" size={38} color={theme.colors.accent} />
          </View>
          <View style={styles.liveHeroContent}>
            <Text style={[styles.liveHeroTitle, { color: theme.colors.accent }]}>Ao vivo agora</Text>
            <Text style={styles.liveHeroSubtitle}>Torneio Sub-18 — Quadra Central</Text>
          </View>
        </Animated.View>

        <SectionHeader icon="video" color={theme.colors.accent} title="Lives" />
        {liveCards.map((l, i) => (
          <InfoCard key={i} icon={l.icon} color={l.color} title={l.title} desc={l.desc} />
        ))}

        <SectionHeader icon="clock-outline" color={theme.colors.accent} title="Agenda" />
        <InfoCard icon="calendar-multiple" color={theme.colors.accent} title="Calendário" desc="Confira as próximas transmissões" />
        <InfoCard icon="bell-ring" color={theme.colors.accent} title="Alertas" desc="Ative notificações para não perder nada" />

        <Divider inset={theme.spacing(2)} />

        <SectionHeader icon="information" color={theme.colors.accent} title="Dica" />
        <View style={styles.infoBlock}>
          <Text style={styles.infoBlockText}>
            Se o sinal cair, atualize a página ou volte à home e reabra a live. Depois, compareça às
            gravações na Biblioteca.
          </Text>
        </View>

        <View style={styles.spaceBottom} />
      </ScrollView>

      <FooterNav go={go} />
    </View>
  );
};

// BIBLIOTECA — estante, cards horizontais e favoritos
const BibliotecaScreen = ({ go }) => {
  return (
    <View style={styles.bibliotecaScreen}>
      <Header
        title="Biblioteca"
        subtitle="Conteúdos educativos e inspiradores"
        onBack={() => go('home')}
        tone={theme.colors.info}
        onAbout={() => go('sobremim')}
      />

      <ScrollView style={styles.scroll}>
        <Banner title="Aprenda do seu jeito" subtitle="Lives, podcasts e leituras" color="#60a5fa0f" icon="bookshelf" />

        <SectionHeader icon="book-open-page-variant" color={theme.colors.info} title="Conteúdos" />
        {bibliotecaCards.map((b, i) => (
          <InfoCard key={i} icon={b.icon} color={b.color} title={b.title} desc={b.desc} />
        ))}

        <SectionHeader icon="playlist-check" color={theme.colors.info} title="Playlists e leituras" />
        <InfoCard icon="bookmark-check" color={theme.colors.info} title="Favoritos" desc="Salve o que te inspira" />
        <InfoCard icon="folder-heart" color={theme.colors.info} title="Minhas seleções" desc="Suas escolhas, suas vitórias" />

        <Divider inset={theme.spacing(2)} />

        <SectionHeader icon="file-document-edit-outline" color={theme.colors.info} title="Como aproveitar melhor" />
        <View style={styles.infoBlock}>
          <Text style={styles.infoBlockText}>
            Crie uma rotina simples: um conteúdo por dia. Reflita, anote e compartilhe com o time.
            A constância constrói.
          </Text>
        </View>

        <View style={styles.spaceBottom} />
      </ScrollView>

      <FooterNav go={go} />
    </View>
  );
};

// OBJETIVO DO APP — substitui Perfil, explica o basquete como elo da sociedade
const ObjetivoAppScreen = ({ go }) => {
  return (
    <View style={styles.objetivoScreen}>
      <Header
        title="Objetivo do App"
        subtitle="Basquete como elo da sociedade"
        onBack={() => go('home')}
        tone={theme.colors.ok}
        onAbout={() => go('sobremim')}
      />

      <ScrollView style={styles.scroll}>
        <Banner
          title="Pontes que aproximam"
          subtitle="O jogo unindo pessoas, oportunidades e comunidades"
          color="#22c55e0f"
          icon="bridge"
        />

        <SectionHeader icon="handshake" color={theme.colors.ok} title="O que buscamos" />
        {objetivoAppBullets.map((o, i) => (
          <InfoCard key={i} icon={o.icon} color={o.color} title={o.title} desc={o.desc} />
        ))}

        <SectionHeader icon="lightbulb-outline" color={theme.colors.ok} title="Essência do Hoop Bridge" />
        <View style={styles.infoBlock}>
          <Text style={styles.infoBlockText}>
            O basquete é mais do que um jogo. É uma linguagem universal que conecta pessoas, inspira jovens
            e fortalece comunidades. O Hoop Bridge existe para ser a ponte entre talento, oportunidade e
            transformação, levando treino, mentoria e educação a quem quer construir um futuro sólido.
          </Text>
        </View>

        <SectionHeader icon="check-decagram" color={theme.colors.ok} title="Como fazemos" />
        <FeatureList
          items={[
            'Treinos acessíveis e organizados',
            'Mentores comprometidos com seu avanço',
            'Conteúdos educativos práticos e úteis',
            'Oportunidades reais e parcerias locais',
          ]}
          color={theme.colors.ok}
        />

        <View style={styles.spaceBottom} />
      </ScrollView>

      <FooterNav go={go} />
    </View>
  );
};

// SOBRE MIM — nova tela acionada pelo botão “Sobre mim” no topo
const SobreMimScreen = ({ go }) => (
  <View style={styles.screen}>
    <Header
      title="Sobre mim"
      subtitle="Conheça o criador do Hoop Bridge"
      onBack={() => go('home')}
      tone={theme.colors.text}
      onAbout={() => {}}
    />
    <ScrollView style={styles.scroll}>
      
      {/* Foto no topo */}
      <View style={styles.photoSection}>
        <Image
          source={require('./assets/IMG-20250904-WA0014.jpg')} // caminho da sua foto
          style={styles.profilePhoto}
        />
        <Text style={styles.photoLabel}>Henzo Lucas Rizzo de Souza</Text>
      </View>

      {/* Informações pessoais */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionLeft}>
          <MaterialCommunityIcons name="calendar" size={22} color={theme.colors.text} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Informações pessoais</Text>
        </View>
      </View>
      <InfoCard icon="cake-variant" color={theme.colors.ok} title="Data de nascimento" desc="06/06/2009" />
      <InfoCard icon="school-outline" color={theme.colors.blue} title="Escola" desc="ETEC Professor Milton Gazzetti" />
      <InfoCard icon="account-badge" color={theme.colors.secondary} title="Nome completo" desc="Henzo Lucas Rizzo de Souza" />

      {/* Intenção do projeto */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionLeft}>
          <MaterialCommunityIcons name="bullseye-arrow" size={22} color={theme.colors.text} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Intenção do projeto</Text>
        </View>
      </View>
      <View style={styles.infoBlock}>
        <Text style={styles.infoBlockText}>
          Criar uma ponte entre o esporte e a transformação social, usando o basquete como ferramenta de
          conexão, disciplina e evolução. Simples, direto e com impacto real.
        </Text>
      </View>

      <View style={styles.spaceBottom} />
    </ScrollView>
  </View>
);


// -----------------------------------------------------------------------------
// Root (switch de navegação entre as telas)
// -----------------------------------------------------------------------------
export default function App() {
  const [tela, setTela] = useState('home');

  const go = (route) => {
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
      case 'objetivo':
        return <ObjetivoAppScreen go={go} />;
      case 'sobremim':
        return <SobreMimScreen go={go} />;
      default:
        return <HomeScreen go={go} />;
    }
  }, [tela]);

  // Animação de transição global
  const opacity = useFade(350);
  const { translateY } = useSlideUp(12, 350);

  return (
    <Animated.View style={[styles.app, { opacity, transform: [{ translateY }] }]}>
      {Screen}
    </Animated.View>
  );
}

// -----------------------------------------------------------------------------
// Estilos detalhados
// -----------------------------------------------------------------------------
const styles = StyleSheet.create({
  // App container
  app: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },

  // Telas base
  screen: { flex: 1, backgroundColor: theme.colors.bg },
  scroll: { paddingHorizontal: theme.spacing(2) },

  // TELA: Treinos — personalidade
  treinosScreen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  treinosTopBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginHorizontal: theme.spacing(2),
    marginBottom: theme.spacing(1),
    paddingVertical: theme.spacing(1),
    paddingHorizontal: theme.spacing(1.5),
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.card,
  },
  treinosTopBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // TELA: Mentoria — personalidade
  mentoriaScreen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },

  // TELA: Educação — personalidade
  educacaoScreen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },

  // TELA: Oportunidades — personalidade
  oportunidadesScreen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },

  // TELA: Live — personalidade
  liveScreen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  liveHero: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(2),
    marginHorizontal: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  liveHeroLeft: {
    paddingRight: theme.spacing(1.5),
  },
  liveHeroContent: {
    flex: 1,
  },
  liveHeroTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  liveHeroSubtitle: {
    color: theme.colors.subtext,
    fontSize: 14,
    marginTop: 4,
  },

  // TELA: Biblioteca — personalidade
  bibliotecaScreen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },

  // TELA: Objetivo — personalidade
  objetivoScreen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },

  // TELA: Sobre Mim — personalidade
  sobreMimScreen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
photoSection: {
  alignItems: 'center',
  marginVertical: 20,
},
profilePhoto: {
  width: 160,
  height: 160,
  borderRadius: 80, // deixa redondo
  borderWidth: 3,
  borderColor: theme.colors.border,
},
photoLabel: {
  marginTop: 12,
  color: theme.colors.text,
  fontSize: 18,
  fontWeight: '700',
},


  // Header
  header: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    paddingHorizontal: theme.spacing(2),
    backgroundColor: theme.colors.bg,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing(2) },
  backBtn: {
    padding: theme.spacing(1.5),
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.softCard,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  backPlaceholder: { width: 44, height: 44 },
  headerRight: {
    marginLeft: 'auto',
  },
  aboutBtn: {
    paddingVertical: theme.spacing(1.2),
    paddingHorizontal: theme.spacing(2),
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.softCard,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  aboutBtnText: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: theme.colors.text },
  headerSubtitle: { marginTop: theme.spacing(1), fontSize: 14, color: theme.colors.subtext },

  // Section header
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginTop: theme.spacing(3), marginBottom: theme.spacing(1) },
  sectionLeft: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing(1) },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  sectionRight: {},

  // Category grid
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing(1.5),
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingHorizontal: theme.spacing(2),
    width: '100%',
  },
  categoryCard: {
    width: Platform.OS === 'web' ? 280 : (width - theme.spacing(6)) / 2.2,
    height: Platform.OS === 'web' ? 'auto' : (width - theme.spacing(6)) / 2.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.soft,
  },
  categoryIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
  },
  categoryTextBlock: { gap: 4 },
  categoryTitle: { fontSize: 15, fontWeight: '700', color: theme.colors.text },
  categoryDesc: { fontSize: 13, color: theme.colors.subtext },

  // Chips
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Banner
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.radius.lg,
    padding: theme.spacing(2),
    marginHorizontal: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.soft,
  },
  bannerLeft: { paddingRight: theme.spacing(1.5) },
  bannerIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerContent: { flex: 1 },
  bannerTitle: { color: theme.colors.text, fontSize: 16, fontWeight: '700' },
  bannerSubtitle: { color: theme.colors.subtext, fontSize: 14, marginTop: 4 },

  // Info block (parágrafos)
  infoBlock: {
    marginHorizontal: theme.spacing(2),
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  infoBlockText: {
    color: theme.colors.subtext,
    fontSize: 14,
    lineHeight: 20,
  },

  // Info card
  infoCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.softCard,
    borderRadius: theme.radius.md,
    padding: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing(1.5),
    marginHorizontal: theme.spacing(2),
  },
  infoLeft: { paddingRight: theme.spacing(1.5) },
  infoIconWrap: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: { flex: 1, gap: 4 },
  infoHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
    justifyContent: 'space-between',
  },
  infoTitle: { fontSize: 15, fontWeight: '700', color: theme.colors.text },
  infoDesc: { fontSize: 14, color: theme.colors.subtext },

  // Highlight Card
  highlightCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing(2),
    marginHorizontal: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  highlightImage: { width: 110, height: 110 },
  highlightText: { flex: 1, padding: theme.spacing(2), justifyContent: 'center', gap: 6 },
  highlightTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  highlightTitle: { color: theme.colors.text, fontSize: 16, fontWeight: '700' },
  highlightDesc: { color: theme.colors.subtext, fontSize: 14 },

  // Stat cards
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing(1.5),
    paddingHorizontal: theme.spacing(2),
    marginTop: theme.spacing(1),
    flexWrap: 'wrap',
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing(1.5),
    paddingHorizontal: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    width: Platform.OS === 'web'
      ? (1200 - theme.spacing(4) - theme.spacing(1.5)) / 3 - 6
      : (width - theme.spacing(4) - theme.spacing(1.5)) / 2 - 6,
    ...theme.shadow.soft,
  },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statContent: { flex: 1 },
  statValue: { fontSize: 16, fontWeight: '700' },
  statLabel: { fontSize: 12, color: theme.colors.subtext },

  // Gradient Card
  gradientCard: {
    borderRadius: theme.radius.lg,
    marginHorizontal: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    position: 'relative',
  },
  gradientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(2),
    gap: theme.spacing(1.5),
  },
  gradientIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientContent: { flex: 1 },
  gradientTitle: { color: theme.colors.text, fontSize: 16, fontWeight: '700' },
  gradientSubtitle: { color: theme.colors.subtext, fontSize: 14, marginTop: 4 },
  gradientShimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 140,
    backgroundColor: '#ffffff15',
  },

  // Feature list
  featureList: {
    marginHorizontal: theme.spacing(2),
    paddingVertical: theme.spacing(1),
    gap: theme.spacing(1),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing(1),
    paddingHorizontal: theme.spacing(1.5),
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  featureText: { color: theme.colors.text, fontSize: 14 },

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
  footerItem: { alignItems: 'center', gap: theme.spacing(0.5) },
  footerText: { fontSize: 12, color: theme.colors.subtext },

  // Espaçamento inferior
  spaceBottom: { height: theme.spacing(6) },
});
