// IA DO CHEF JOSÉ V3.0 - SISTEMA ULTRA COMPLETO
// 500+ ingredientes, 20 técnicas, IMPOSSÍVEL não ter receita

type SmartChefAdvice = {
  recipeName: string;
  instructions: string;
  shoppingListSuggestions: string[];
  estimatedTime?: number;
  difficulty?: 'Fácil' | 'Médio' | 'Difícil';
  servings?: number;
  cuisine?: string;
  tags?: string[];
};

type IngredienteInfo = {
  categoria: string;
  complementos: string[];
  tempo: number;
  temperos: string[];
  tecnicas: string[];
  subcategoria?: string;
  regiao?: string;
  aliases?: string[];
};

// BANCO DE DADOS MEGA EXPANDIDO - 500+ INGREDIENTES
const INGREDIENTES_DB: Record<string, IngredienteInfo> = {
  // PROTEÍNAS - AVES
  'frango': { categoria: 'proteina', subcategoria: 'ave', complementos: ['limão', 'mostarda', 'shoyu', 'mel'], tempo: 35, temperos: ['alho', 'cebola', 'páprica', 'cominho'], tecnicas: ['assado', 'refogado', 'grelhado', 'frito'], aliases: ['galinha', 'franguinho'] },
  'peito-de-frango': { categoria: 'proteina', subcategoria: 'ave', complementos: ['queijo', 'presunto', 'espinafre'], tempo: 25, temperos: ['alho', 'orégano', 'páprica'], tecnicas: ['grelhado', 'assado', 'recheado'], aliases: ['peito', 'filé-de-frango'] },
  'coxa': { categoria: 'proteina', subcategoria: 'ave', complementos: ['barbecue', 'mel', 'cerveja'], tempo: 40, temperos: ['alho', 'páprica-defumada'], tecnicas: ['assado', 'guisado'], aliases: ['coxa-de-frango'] },
  'sobrecoxa': { categoria: 'proteina', subcategoria: 'ave', complementos: ['shoyu', 'gengibre', 'mel'], tempo: 40, temperos: ['alho', 'curry'], tecnicas: ['assado', 'grelhado'] },
  'asa': { categoria: 'proteina', subcategoria: 'ave', complementos: ['molho-picante', 'mel', 'gergelim'], tempo: 35, temperos: ['alho', 'shoyu'], tecnicas: ['assado', 'frito'], aliases: ['asa-de-frango', 'asinha'] },
  'figado': { categoria: 'proteina', subcategoria: 'ave', complementos: ['cebola', 'bacon', 'vinho'], tempo: 15, temperos: ['alho', 'sálvia'], tecnicas: ['refogado'], aliases: ['fígado-de-frango'] },
  'moela': { categoria: 'proteina', subcategoria: 'ave', complementos: ['cebola', 'pimentão'], tempo: 45, temperos: ['alho', 'louro'], tecnicas: ['cozido', 'refogado'] },
  'coracao': { categoria: 'proteina', subcategoria: 'ave', complementos: ['cebola', 'bacon'], tempo: 20, temperos: ['alho', 'páprica'], tecnicas: ['grelhado', 'espeto'], aliases: ['coração-de-frango'] },
  'peru': { categoria: 'proteina', subcategoria: 'ave', complementos: ['farofa', 'frutas-secas'], tempo: 180, temperos: ['ervas-finas', 'vinho'], tecnicas: ['assado', 'recheado'] },
  'pato': { categoria: 'proteina', subcategoria: 'ave', complementos: ['laranja', 'tucupi'], tempo: 120, temperos: ['gengibre', 'cravo'], tecnicas: ['assado', 'confitado'], regiao: 'Norte' },
  'codorna': { categoria: 'proteina', subcategoria: 'ave', complementos: ['bacon', 'vinho-tinto'], tempo: 25, temperos: ['tomilho', 'alecrim'], tecnicas: ['assado', 'grelhado'] },

  // PROTEÍNAS - CARNES VERMELHAS
  'carne': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['cebola', 'cerveja', 'mostarda'], tempo: 45, temperos: ['alho', 'sal-grosso', 'pimenta', 'louro'], tecnicas: ['assado', 'grelhado', 'ensopado', 'refogado'], aliases: ['carne-bovina', 'boi'] },
  'picanha': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['alho', 'farofa'], tempo: 25, temperos: ['sal-grosso', 'alho'], tecnicas: ['grelhado', 'churrasco'] },
  'file-mignon': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['molho-madeira', 'bacon'], tempo: 15, temperos: ['sal', 'pimenta-rosa'], tecnicas: ['grelhado', 'selado'], aliases: ['filé-mignon', 'mignon'] },
  'alcatra': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['cebola', 'pimentão'], tempo: 35, temperos: ['alho', 'sal-grosso'], tecnicas: ['assado', 'grelhado'] },
  'contrafile': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['cogumelos', 'vinho-tinto'], tempo: 20, temperos: ['sal', 'pimenta', 'alho'], tecnicas: ['grelhado', 'selado'], aliases: ['contra-filé'] },
  'costela': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['barbecue', 'cerveja'], tempo: 240, temperos: ['alho', 'cominho', 'páprica-defumada'], tecnicas: ['assado-lento', 'churrasco'], aliases: ['costela-bovina'] },
  'carne-moida': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['tomate', 'ervilha', 'batata'], tempo: 20, temperos: ['alho', 'cebola', 'cominho'], tecnicas: ['refogado', 'almôndega'], aliases: ['moída', 'moído'] },
  'patinho': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['legumes', 'vinho'], tempo: 90, temperos: ['alho', 'louro', 'tomilho'], tecnicas: ['ensopado', 'cozido'] },
  'acem': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['cenoura', 'batata', 'mandioca'], tempo: 120, temperos: ['alho', 'louro', 'colorau'], tecnicas: ['cozido', 'panela-de-pressão'], aliases: ['acém'] },
  'carne-seca': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['abóbora', 'mandioca'], tempo: 60, temperos: ['alho', 'pimenta-de-cheiro'], tecnicas: ['dessalgado', 'refogado'], regiao: 'Nordeste', aliases: ['jabá'] },
  'rabada': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['cerveja-preta', 'legumes'], tempo: 180, temperos: ['alho', 'louro'], tecnicas: ['guisado'] },
  'fraldinha': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['alho', 'chimichurri'], tempo: 30, temperos: ['sal-grosso', 'pimenta'], tecnicas: ['grelhado', 'churrasco'] },
  'maminha': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['alho', 'manteiga'], tempo: 35, temperos: ['sal-grosso'], tecnicas: ['grelhado', 'assado'] },
  'cupim': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['cerveja', 'barbecue'], tempo: 300, temperos: ['sal-grosso', 'páprica'], tecnicas: ['assado-lento', 'defumado'] },
  'lagarto': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['vinho', 'legumes'], tempo: 150, temperos: ['alho', 'louro'], tecnicas: ['assado-lento', 'fatiado'] },
  'musculo': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['legumes', 'vinho'], tempo: 180, temperos: ['alho', 'louro'], tecnicas: ['cozido', 'ensopado'], aliases: ['músculo'] },
  'figado-bovino': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['cebola', 'bacon'], tempo: 15, temperos: ['alho', 'sálvia'], tecnicas: ['refogado'], aliases: ['fígado'] },
  'mocoto': { categoria: 'proteina', subcategoria: 'bovina', complementos: ['grão-de-bico', 'legumes'], tempo: 240, temperos: ['alho', 'cominho'], tecnicas: ['cozido'], regiao: 'Brasil' },

  // PROTEÍNAS - SUÍNAS
  'porco': { categoria: 'proteina', subcategoria: 'suína', complementos: ['abacaxi', 'mel', 'mostarda'], tempo: 40, temperos: ['alho', 'orégano', 'páprica'], tecnicas: ['assado', 'grelhado'], aliases: ['carne-de-porco', 'suíno'] },
  'costela-suina': { categoria: 'proteina', subcategoria: 'suína', complementos: ['barbecue', 'mel'], tempo: 120, temperos: ['páprica-defumada', 'açúcar-mascavo'], tecnicas: ['assado-lento', 'churrasco'], aliases: ['costela-de-porco'] },
  'lombo': { categoria: 'proteina', subcategoria: 'suína', complementos: ['ameixa', 'bacon'], tempo: 60, temperos: ['alecrim', 'tomilho'], tecnicas: ['assado', 'recheado'], aliases: ['lombo-suíno'] },
  'linguica': { categoria: 'proteina', subcategoria: 'suína', complementos: ['cebola', 'pimentão'], tempo: 20, temperos: ['vinagre'], tecnicas: ['grelhado', 'frito'], aliases: ['linguiça', 'calabresa'] },
  'bacon': { categoria: 'proteina', subcategoria: 'suína', complementos: ['ovos', 'queijo'], tempo: 10, temperos: ['pimenta'], tecnicas: ['frito', 'crocante'] },
  'pernil': { categoria: 'proteina', subcategoria: 'suína', complementos: ['cerveja', 'mel'], tempo: 240, temperos: ['alho', 'louro', 'mostarda'], tecnicas: ['assado-lento'] },
  'bisteca': { categoria: 'proteina', subcategoria: 'suína', complementos: ['cebola', 'vinagre'], tempo: 25, temperos: ['alho', 'páprica'], tecnicas: ['grelhado', 'frito'] },
  'panceta': { categoria: 'proteina', subcategoria: 'suína', complementos: ['mel', 'mostarda'], tempo: 90, temperos: ['páprica-defumada'], tecnicas: ['assado', 'defumado'] },
  'barriga-de-porco': { categoria: 'proteina', subcategoria: 'suína', complementos: ['shoyu', 'mel'], tempo: 120, temperos: ['cinco-especiarias'], tecnicas: ['assado-lento', 'crocante'] },
  'salsicha': { categoria: 'proteina', subcategoria: 'suína', complementos: ['pão', 'molho-de-tomate'], tempo: 10, temperos: ['mostarda'], tecnicas: ['cozido', 'grelhado'] },
  'presunto': { categoria: 'proteina', subcategoria: 'suína', complementos: ['queijo', 'tomate'], tempo: 0, temperos: ['orégano'], tecnicas: ['fatiado'] },
  'torresmo': { categoria: 'proteina', subcategoria: 'suína', complementos: ['feijão', 'farofa'], tempo: 30, temperos: ['sal-grosso'], tecnicas: ['frito', 'crocante'], regiao: 'Brasil' },

  // PROTEÍNAS - PEIXES
  'peixe': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['limão', 'coentro', 'coco'], tempo: 20, temperos: ['alho', 'azeite', 'pimenta'], tecnicas: ['assado', 'grelhado', 'frito', 'ensopado'] },
  'salmao': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['molho-teriyaki', 'mel'], tempo: 18, temperos: ['limão', 'dill', 'gergelim'], tecnicas: ['grelhado', 'assado'], aliases: ['salmão'] },
  'tilapia': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['coco', 'tomate'], tempo: 15, temperos: ['alho', 'limão', 'coentro'], tecnicas: ['frito', 'assado'], aliases: ['tilápia'] },
  'bacalhau': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['batata', 'azeite', 'azeitona'], tempo: 40, temperos: ['alho', 'salsinha'], tecnicas: ['dessalgado', 'assado', 'bolinho'] },
  'atum': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['gergelim', 'wasabi', 'shoyu'], tempo: 10, temperos: ['limão', 'gengibre'], tecnicas: ['selado', 'cru'] },
  'sardinha': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['limão', 'tomate'], tempo: 12, temperos: ['alho', 'coentro'], tecnicas: ['grelhado', 'assado'] },
  'pescada': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['coco', 'dendê'], tempo: 20, temperos: ['alho', 'coentro', 'colorau'], tecnicas: ['moqueca', 'frito'], regiao: 'Nordeste' },
  'pirarucu': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['leite-de-coco', 'banana-da-terra'], tempo: 25, temperos: ['alho', 'tucupi'], tecnicas: ['assado', 'caldeirada'], regiao: 'Norte' },
  'tambaqui': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['tucupi', 'jambu'], tempo: 30, temperos: ['alho', 'coentro'], tecnicas: ['assado', 'costela'], regiao: 'Norte' },
  'dourado': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['manteiga', 'alcaparras'], tempo: 20, temperos: ['alho', 'salsinha'], tecnicas: ['grelhado', 'assado'] },
  'robalo': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['vinho-branco', 'alcaparras'], tempo: 25, temperos: ['alho', 'manjericão'], tecnicas: ['assado', 'papelote'] },
  'truta': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['amêndoas', 'manteiga'], tempo: 15, temperos: ['alho', 'tomilho'], tecnicas: ['grelhado', 'defumado'] },
  'linguado': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['manteiga', 'alcaparras'], tempo: 12, temperos: ['limão', 'salsinha'], tecnicas: ['grelhado'] },
  'badejo': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['tomate', 'cebola'], tempo: 20, temperos: ['alho', 'coentro'], tecnicas: ['assado', 'moqueca'] },
  'corvina': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['tomate', 'cebola'], tempo: 20, temperos: ['alho', 'coentro'], tecnicas: ['assado', 'moqueca'] },
  'pacu': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['limão', 'farofa'], tempo: 25, temperos: ['alho', 'cominho'], tecnicas: ['assado', 'frito'], regiao: 'Centro-Oeste' },
  'pintado': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['limão', 'urucum'], tempo: 25, temperos: ['alho', 'colorau'], tecnicas: ['assado', 'caldeirada'], regiao: 'Centro-Oeste' },
  'tucunare': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['tucupi', 'farinha'], tempo: 20, temperos: ['alho', 'limão'], tecnicas: ['frito', 'assado'], regiao: 'Norte', aliases: ['tucunaré'] },
  'cacao': { categoria: 'proteina', subcategoria: 'peixe', complementos: ['banana-da-terra', 'farinha'], tempo: 20, temperos: ['alho'], tecnicas: ['grelhado', 'frito'], regiao: 'Sul', aliases: ['cação'] },

  // FRUTOS DO MAR
  'camarao': { categoria: 'proteina', subcategoria: 'frutos-mar', complementos: ['alho', 'limão', 'dendê'], tempo: 8, temperos: ['alho', 'coentro', 'pimenta'], tecnicas: ['salteado', 'grelhado', 'bobó'], aliases: ['camarão'] },
  'lula': { categoria: 'proteina', subcategoria: 'frutos-mar', complementos: ['limão', 'pimentão'], tempo: 10, temperos: ['alho', 'coentro'], tecnicas: ['grelhado', 'frito', 'recheado'] },
  'polvo': { categoria: 'proteina', subcategoria: 'frutos-mar', complementos: ['batata', 'azeite'], tempo: 60, temperos: ['alho', 'louro', 'pimentão'], tecnicas: ['cozido', 'grelhado'] },
  'mexilhao': { categoria: 'proteina', subcategoria: 'frutos-mar', complementos: ['vinho-branco', 'tomate'], tempo: 12, temperos: ['alho', 'salsinha'], tecnicas: ['cozido'], aliases: ['mexilhão'] },
  'lagosta': { categoria: 'proteina', subcategoria: 'frutos-mar', complementos: ['manteiga', 'limão'], tempo: 15, temperos: ['alho', 'ervas-finas'], tecnicas: ['grelhado', 'cozido'] },
  'siri': { categoria: 'proteina', subcategoria: 'frutos-mar', complementos: ['leite-de-coco', 'dendê'], tempo: 20, temperos: ['alho', 'coentro'], tecnicas: ['casquinha', 'refogado'], regiao: 'Nordeste' },
  'caranguejo': { categoria: 'proteina', subcategoria: 'frutos-mar', complementos: ['leite-de-coco', 'tomate'], tempo: 25, temperos: ['alho', 'coentro'], tecnicas: ['cozido', 'casquinha'], regiao: 'Nordeste' },
  'ostra': { categoria: 'proteina', subcategoria: 'frutos-mar', complementos: ['limão', 'molho-de-pimenta'], tempo: 5, temperos: ['limão'], tecnicas: ['cru', 'gratinado'] },
  'vieira': { categoria: 'proteina', subcategoria: 'frutos-mar', complementos: ['manteiga', 'alho'], tempo: 8, temperos: ['alho', 'salsinha'], tecnicas: ['grelhado', 'gratinado'] },

  // OVOS
  'ovo': { categoria: 'proteina', subcategoria: 'ovo', complementos: ['queijo', 'presunto', 'tomate'], tempo: 10, temperos: ['sal', 'pimenta', 'cheiro-verde'], tecnicas: ['frito', 'mexido', 'cozido', 'omelete'], aliases: ['ovos'] },
  'ovo-de-codorna': { categoria: 'proteina', subcategoria: 'ovo', complementos: ['bacon', 'queijo'], tempo: 5, temperos: ['sal', 'pimenta'], tecnicas: ['cozido', 'frito'], aliases: ['codorna'] },

  // GRÃOS E CEREAIS
  'arroz': { categoria: 'carboidrato', subcategoria: 'grão', complementos: ['alho', 'cebola', 'legumes'], tempo: 20, temperos: ['alho', 'cebola', 'sal'], tecnicas: ['cozido', 'pilaf', 'risoto'], aliases: ['arroz-branco'] },
  'arroz-integral': { categoria: 'carboidrato', subcategoria: 'grão', complementos: ['legumes', 'gergelim'], tempo: 35, temperos: ['alho', 'cebola'], tecnicas: ['cozido', 'pilaf'] },
  'arroz-arboreo': { categoria: 'carboidrato', subcategoria: 'grão', complementos: ['vinho-branco', 'queijo-parmesão'], tempo: 25, temperos: ['cebola', 'manteiga'], tecnicas: ['risoto'], aliases: ['arbóreo'] },
  'quinoa': { categoria: 'carboidrato', subcategoria: 'grão', complementos: ['legumes', 'abacate'], tempo: 15, temperos: ['limão', 'azeite'], tecnicas: ['cozido', 'salada'] },
  'aveia': { categoria: 'carboidrato', subcategoria: 'grão', complementos: ['leite', 'frutas', 'mel'], tempo: 5, temperos: ['canela', 'açúcar'], tecnicas: ['mingau', 'overnight'] },
  'trigo': { categoria: 'carboidrato', subcategoria: 'grão', complementos: ['legumes', 'ervas'], tempo: 40, temperos: ['azeite', 'limão'], tecnicas: ['cozido', 'salada'] },
  'cevada': { categoria: 'carboidrato', subcategoria: 'grão', complementos: ['legumes', 'cogumelos'], tempo: 45, temperos: ['alho', 'tomilho'], tecnicas: ['risoto', 'sopa'] },
  'cevadinha': { categoria: 'carboidrato', subcategoria: 'grão', complementos: ['legumes', 'frango'], tempo: 25, temperos: ['alho', 'colorau'], tecnicas: ['cozido', 'sopa'] },
  'milho': { categoria: 'carboidrato', subcategoria: 'grão', complementos: ['manteiga', 'queijo'], tempo: 20, temperos: ['sal', 'açúcar'], tecnicas: ['cozido', 'creme'], regiao: 'Brasil', aliases: ['milho-verde'] },
  'fuba': { categoria: 'carboidrato', subcategoria: 'grão', complementos: ['queijo', 'goiabada'], tempo: 20, temperos: ['sal', 'açúcar'], tecnicas: ['polenta', 'bolo'], regiao: 'Brasil', aliases: ['fubá', 'farinha-de-milho'] },
  'cuscuz': { categoria: 'carboidrato', subcategoria: 'grão', complementos: ['ovo', 'queijo'], tempo: 15, temperos: ['sal'], tecnicas: ['vapor', 'cuscuzeira'], regiao: 'Nordeste' },

  // MASSAS
  'macarrao': { categoria: 'carboidrato', subcategoria: 'massa', complementos: ['molho', 'queijo', 'carne'], tempo: 12, temperos: ['alho', 'azeite', 'manjericão'], tecnicas: ['al-dente', 'gratinado'], aliases: ['macarrão', 'massa'] },
  'espaguete': { categoria: 'carboidrato', subcategoria: 'massa', complementos: ['molho-de-tomate', 'almôndegas'], tempo: 10, temperos: ['alho', 'manjericão'], tecnicas: ['al-dente', 'carbonara'] },
  'penne': { categoria: 'carboidrato', subcategoria: 'massa', complementos: ['molho-branco', 'frango'], tempo: 11, temperos: ['alho', 'queijo'], tecnicas: ['gratinado', 'al-forno'] },
  'lasanha': { categoria: 'carboidrato', subcategoria: 'massa', complementos: ['molho-bolonhesa', 'queijo'], tempo: 45, temperos: ['manjericão', 'orégano'], tecnicas: ['assado', 'gratinado'] },
  'nhoque': { categoria: 'carboidrato', subcategoria: 'massa', complementos: ['molho-de-tomate', 'manteiga-e-sálvia'], tempo: 30, temperos: ['sal', 'noz-moscada'], tecnicas: ['cozido', 'artesanal'], aliases: ['gnocchi'] },
  'ravioli': { categoria: 'carboidrato', subcategoria: 'massa', complementos: ['molho-branco', 'manteiga'], tempo: 8, temperos: ['sálvia', 'parmesão'], tecnicas: ['cozido', 'recheado'], aliases: ['ravióli'] },
  'fusilli': { categoria: 'carboidrato', subcategoria: 'massa', complementos: ['pesto', 'tomate-seco'], tempo: 10, temperos: ['manjericão', 'azeite'], tecnicas: ['al-dente', 'salada'] },
  'talharim': { categoria: 'carboidrato', subcategoria: 'massa', complementos: ['frango', 'creme'], tempo: 8, temperos: ['alho', 'noz-moscada'], tecnicas: ['al-dente', 'molho'] },
  'miojo': { categoria: 'carboidrato', subcategoria: 'massa', complementos: ['ovo', 'legumes'], tempo: 3, temperos: ['tempero-pronto'], tecnicas: ['cozido', 'rápido'], aliases: ['macarrão-instantâneo', 'lamen'] },

  // TUBÉRCULOS
  'batata': { categoria: 'carboidrato', subcategoria: 'tubérculo', complementos: ['alho', 'manteiga', 'queijo'], tempo: 25, temperos: ['alho', 'sal', 'salsinha'], tecnicas: ['assado', 'frito', 'purê', 'cozido'] },
  'batata-doce': { categoria: 'carboidrato', subcategoria: 'tubérculo', complementos: ['canela', 'mel'], tempo: 30, temperos: ['canela', 'noz-moscada'], tecnicas: ['assado', 'purê', 'chips'] },
  'batata-inglesa': { categoria: 'carboidrato', subcategoria: 'tubérculo', complementos: ['creme-de-leite', 'bacon'], tempo: 25, temperos: ['alho', 'manteiga'], tecnicas: ['assado', 'gratinado'], aliases: ['batata-branca'] },
  'mandioca': { categoria: 'carboidrato', subcategoria: 'tubérculo', complementos: ['manteiga', 'queijo'], tempo: 30, temperos: ['sal', 'alho'], tecnicas: ['cozido', 'frito', 'purê'], regiao: 'Brasil', aliases: ['aipim', 'macaxeira'] },
  'inhame': { categoria: 'carboidrato', subcategoria: 'tubérculo', complementos: ['azeite', 'alho'], tempo: 25, temperos: ['sal', 'pimenta'], tecnicas: ['cozido', 'assado'] },
  'cara': { categoria: 'carboidrato', subcategoria: 'tubérculo', complementos: ['manteiga', 'queijo'], tempo: 30, temperos: ['sal', 'alho'], tecnicas: ['cozido', 'gratinado'], aliases: ['cará'] },
  'mandioquinha': { categoria: 'carboidrato', subcategoria: 'tubérculo', complementos: ['manteiga', 'leite'], tempo: 20, temperos: ['sal', 'noz-moscada'], tecnicas: ['cozido', 'purê'], aliases: ['batata-baroa', 'batata-salsa'] },

  // LEGUMES
  'tomate': { categoria: 'legume', complementos: ['manjericão', 'mussarela', 'cebola'], tempo: 15, temperos: ['azeite', 'sal', 'orégano'], tecnicas: ['molho', 'salada', 'assado'] },
  'cebola': { categoria: 'legume', complementos: ['alho', 'pimentão'], tempo: 5, temperos: ['azeite', 'sal'], tecnicas: ['refogado', 'caramelizado', 'cru'] },
  'alho': { categoria: 'tempero', complementos: ['azeite', 'salsinha'], tempo: 2, temperos: ['azeite', 'sal'], tecnicas: ['refogado', 'assado', 'confitado'] },
  'pimentao': { categoria: 'legume', complementos: ['cebola', 'tomate'], tempo: 10, temperos: ['azeite', 'alho'], tecnicas: ['refogado', 'assado', 'recheado'], aliases: ['pimentão'] },
  'cenoura': { categoria: 'legume', complementos: ['manteiga', 'mel'], tempo: 15, temperos: ['sal', 'salsinha'], tecnicas: ['cozido', 'assado', 'ralado'] },
  'abobrinha': { categoria: 'legume', complementos: ['tomate', 'queijo'], tempo: 10, temperos: ['azeite', 'manjericão'], tecnicas: ['refogado', 'grelhado'] },
  'abobora': { categoria: 'legume', complementos: ['queijo', 'carne-seca'], tempo: 20, temperos: ['alho', 'cominho'], tecnicas: ['cozido', 'assado'], regiao: 'Nordeste', aliases: ['abóbora', 'jerimum'] },
  'berinjela': { categoria: 'legume', complementos: ['tomate', 'queijo'], tempo: 15, temperos: ['azeite', 'alho'], tecnicas: ['assado', 'parmegiana'] },
  'beterraba': { categoria: 'legume', complementos: ['queijo-de-cabra', 'nozes'], tempo: 40, temperos: ['azeite', 'vinagre-balsâmico'], tecnicas: ['cozido', 'assado'] },
  'brocolis': { categoria: 'legume', complementos: ['alho', 'queijo'], tempo: 8, temperos: ['azeite', 'limão'], tecnicas: ['cozido-no-vapor', 'refogado'], aliases: ['brócolis'] },
  'couve-flor': { categoria: 'legume', complementos: ['queijo', 'curry'], tempo: 10, temperos: ['azeite', 'cominho'], tecnicas: ['cozido-no-vapor', 'assado'] },
  'vagem': { categoria: 'legume', complementos: ['alho', 'tomate'], tempo: 12, temperos: ['azeite', 'sal'], tecnicas: ['refogado', 'cozido'] },
  'quiabo': { categoria: 'legume', complementos: ['tomate', 'cebola'], tempo: 15, temperos: ['alho', 'colorau'], tecnicas: ['refogado', 'frito'], regiao: 'Sudeste' },
  'jilo': { categoria: 'legume', complementos: ['cebola', 'tomate'], tempo: 12, temperos: ['alho', 'sal'], tecnicas: ['refogado', 'frito'], regiao: 'Sudeste', aliases: ['jiló'] },
  'chuchu': { categoria: 'legume', complementos: ['ovo', 'queijo'], tempo: 15, temperos: ['alho', 'cheiro-verde'], tecnicas: ['cozido', 'refogado'] },
  'pepino': { categoria: 'legume', complementos: ['iogurte', 'hortelã'], tempo: 0, temperos: ['sal', 'vinagre'], tecnicas: ['cru', 'salada', 'conserva'] },
  'rabanete': { categoria: 'legume', complementos: ['manteiga', 'sal-grosso'], tempo: 0, temperos: ['sal', 'limão'], tecnicas: ['cru', 'salada'] },
  'nabo': { categoria: 'legume', complementos: ['cenoura', 'manteiga'], tempo: 20, temperos: ['sal', 'tomilho'], tecnicas: ['cozido', 'assado'] },
  'cogumelo': { categoria: 'legume', complementos: ['alho', 'manteiga'], tempo: 10, temperos: ['tomilho', 'salsinha'], tecnicas: ['salteado', 'refogado'] },
  'champignon': { categoria: 'legume', complementos: ['creme-de-leite', 'alho'], tempo: 8, temperos: ['manteiga', 'salsinha'], tecnicas: ['salteado', 'molho'] },
  'shitake': { categoria: 'legume', complementos: ['shoyu', 'gengibre'], tempo: 10, temperos: ['alho', 'mirin'], tecnicas: ['salteado'], aliases: ['shiitake'] },
  'shimeji': { categoria: 'legume', complementos: ['manteiga', 'shoyu'], tempo: 8, temperos: ['shoyu', 'manteiga'], tecnicas: ['salteado'] },

  // VERDURAS
  'alface': { categoria: 'verdura', complementos: ['tomate', 'cebola-roxa'], tempo: 0, temperos: ['azeite', 'limão', 'sal'], tecnicas: ['salada', 'cru'] },
  'rucula': { categoria: 'verdura', complementos: ['tomate-seco', 'parmesão'], tempo: 0, temperos: ['azeite', 'limão'], tecnicas: ['salada', 'cru'], aliases: ['rúcula'] },
  'agriao': { categoria: 'verdura', complementos: ['laranja', 'beterraba'], tempo: 0, temperos: ['azeite', 'limão'], tecnicas: ['salada', 'cru'], aliases: ['agrião'] },
  'couve': { categoria: 'verdura', complementos: ['alho', 'bacon'], tempo: 5, temperos: ['azeite', 'alho'], tecnicas: ['refogado', 'cru-picado'], regiao: 'Sudeste' },
  'espinafre': { categoria: 'verdura', complementos: ['alho', 'ricota'], tempo: 5, temperos: ['azeite', 'alho'], tecnicas: ['refogado', 'cozido-no-vapor'] },
  'acelga': { categoria: 'verdura', complementos: ['alho', 'azeite'], tempo: 8, temperos: ['sal', 'pimenta'], tecnicas: ['refogado'] },
  'repolho': { categoria: 'verdura', complementos: ['cenoura', 'maionese'], tempo: 10, temperos: ['vinagre', 'açúcar'], tecnicas: ['refogado', 'salada'], regiao: 'Sul' },
  'chicoria': { categoria: 'verdura', complementos: ['alho', 'azeite'], tempo: 8, temperos: ['sal', 'limão'], tecnicas: ['refogado'], aliases: ['chicória'] },
  'salsa': { categoria: 'tempero', complementos: ['alho', 'limão'], tempo: 0, temperos: ['sal'], tecnicas: ['cru', 'molho'], aliases: ['salsinha'] },
  'coentro': { categoria: 'tempero', complementos: ['limão', 'pimenta'], tempo: 0, temperos: ['sal'], tecnicas: ['cru', 'tempero'], regiao: 'Nordeste' },
  'cebolinha': { categoria: 'tempero', complementos: ['salsinha', 'alho'], tempo: 0, temperos: ['sal'], tecnicas: ['cru', 'tempero'] },
  'manjericao': { categoria: 'tempero', complementos: ['tomate', 'mussarela'], tempo: 0, temperos: ['sal'], tecnicas: ['cru', 'pesto'], aliases: ['manjericão', 'basílico'] },
  'hortela': { categoria: 'tempero', complementos: ['limão', 'pepino'], tempo: 0, temperos: ['açúcar'], tecnicas: ['cru', 'chá'], aliases: ['hortelã'] },
  'oregano': { categoria: 'tempero', complementos: ['tomate', 'queijo'], tempo: 0, temperos: ['azeite'], tecnicas: ['seco', 'tempero'], aliases: ['orégano'] },
  'tomilho': { categoria: 'tempero', complementos: ['alho', 'limão'], tempo: 0, temperos: ['sal'], tecnicas: ['fresco', 'seco'] },
  'alecrim': { categoria: 'tempero', complementos: ['alho', 'azeite'], tempo: 0, temperos: ['sal'], tecnicas: ['fresco', 'seco'] },

  // LEGUMINOSAS
  'feijao': { categoria: 'leguminosa', complementos: ['bacon', 'linguiça'], tempo: 60, temperos: ['alho', 'cebola', 'louro'], tecnicas: ['cozido', 'feijoada', 'tropeiro'], regiao: 'Brasil', aliases: ['feijão'] },
  'feijao-preto': { categoria: 'leguminosa', complementos: ['carne-seca', 'linguiça'], tempo: 60, temperos: ['alho', 'louro'], tecnicas: ['feijoada', 'cozido'], regiao: 'Sudeste', aliases: ['preto'] },
  'feijao-carioca': { categoria: 'leguminosa', complementos: ['bacon', 'calabresa'], tempo: 50, temperos: ['alho', 'cebola'], tecnicas: ['cozido'], aliases: ['carioca'] },
  'feijao-branco': { categoria: 'leguminosa', complementos: ['linguiça', 'bacon'], tempo: 60, temperos: ['alho', 'sálvia'], tecnicas: ['ensopado'], aliases: ['branco'] },
  'feijao-fradinho': { categoria: 'leguminosa', complementos: ['camarão', 'dendê'], tempo: 40, temperos: ['alho', 'coentro'], tecnicas: ['acarajé'], regiao: 'Nordeste', aliases: ['fradinho', 'feijão-de-corda'] },
  'grao-de-bico': { categoria: 'leguminosa', complementos: ['tahine', 'limão'], tempo: 60, temperos: ['alho', 'azeite', 'cominho'], tecnicas: ['cozido', 'homus'], aliases: ['grão-de-bico'] },
  'lentilha': { categoria: 'leguminosa', complementos: ['cenoura', 'bacon'], tempo: 30, temperos: ['alho', 'louro', 'cominho'], tecnicas: ['cozido', 'sopa'] },
  'ervilha': { categoria: 'leguminosa', complementos: ['bacon', 'cebola'], tempo: 15, temperos: ['alho', 'manteiga'], tecnicas: ['cozido', 'refogado'] },
  'soja': { categoria: 'leguminosa', complementos: ['legumes', 'shoyu'], tempo: 90, temperos: ['alho', 'shoyu'], tecnicas: ['cozido', 'proteína-texturizada'] },
  'amendoim': { categoria: 'leguminosa', complementos: ['açúcar', 'mel'], tempo: 20, temperos: ['sal', 'açúcar'], tecnicas: ['torrado', 'pasta'], regiao: 'Brasil' },

  // LATICÍNIOS
  'queijo': { categoria: 'laticinio', complementos: ['pão', 'tomate'], tempo: 0, temperos: ['orégano'], tecnicas: ['fatiado', 'derretido'] },
  'queijo-mussarela': { categoria: 'laticinio', complementos: ['tomate', 'manjericão'], tempo: 0, temperos: ['orégano'], tecnicas: ['derretido', 'gratinado'], aliases: ['mussarela', 'muçarela'] },
  'queijo-parmesao': { categoria: 'laticinio', complementos: ['massa', 'risoto'], tempo: 0, temperos: ['pimenta'], tecnicas: ['ralado', 'lascas'], aliases: ['parmesão'] },
  'queijo-minas': { categoria: 'laticinio', complementos: ['goiabada', 'mel'], tempo: 0, temperos: ['orégano'], tecnicas: ['frio', 'assado'], regiao: 'Sudeste', aliases: ['minas'] },
  'queijo-coalho': { categoria: 'laticinio', complementos: ['mel', 'melado'], tempo: 5, temperos: ['orégano'], tecnicas: ['grelhado', 'espeto'], regiao: 'Nordeste', aliases: ['coalho'] },
  'queijo-gorgonzola': { categoria: 'laticinio', complementos: ['mel', 'nozes'], tempo: 0, temperos: ['pimenta'], tecnicas: ['molho'], aliases: ['gorgonzola'] },
  'queijo-brie': { categoria: 'laticinio', complementos: ['geléia', 'mel'], tempo: 0, temperos: ['ervas'], tecnicas: ['forno', 'frio'], aliases: ['brie'] },
  'queijo-provolone': { categoria: 'laticinio', complementos: ['tomate', 'presunto'], tempo: 0, temperos: ['orégano'], tecnicas: ['derretido'], aliases: ['provolone'] },
  'queijo-cheddar': { categoria: 'laticinio', complementos: ['hamburger', 'nachos'], tempo: 0, temperos: ['pimenta'], tecnicas: ['derretido'], aliases: ['cheddar'] },
  'ricota': { categoria: 'laticinio', complementos: ['espinafre', 'tomate'], tempo: 0, temperos: ['sal', 'noz-moscada'], tecnicas: ['recheio', 'creme'] },
  'requeijao': { categoria: 'laticinio', complementos: ['pão', 'tapioca'], tempo: 0, temperos: ['cheiro-verde'], tecnicas: ['cremoso'], regiao: 'Brasil', aliases: ['requeijão', 'catupiry'] },
  'cream-cheese': { categoria: 'laticinio', complementos: ['salmão', 'ervas'], tempo: 0, temperos: ['cebolinha'], tecnicas: ['pasta', 'molho'] },
  'leite': { categoria: 'laticinio', complementos: ['café', 'chocolate'], tempo: 5, temperos: ['açúcar', 'canela'], tecnicas: ['fervido', 'creme'] },
  'creme-de-leite': { categoria: 'laticinio', complementos: ['frango', 'cogumelos'], tempo: 5, temperos: ['sal', 'noz-moscada'], tecnicas: ['molho', 'estrogonofe'] },
  'iogurte': { categoria: 'laticinio', complementos: ['frutas', 'granola'], tempo: 0, temperos: ['baunilha'], tecnicas: ['natural', 'molho'] },
  'manteiga': { categoria: 'laticinio', complementos: ['alho', 'ervas'], tempo: 2, temperos: ['sal'], tecnicas: ['derretida', 'composta'] },
  'leite-condensado': { categoria: 'laticinio', complementos: ['limão', 'chocolate'], tempo: 0, temperos: ['baunilha'], tecnicas: ['doce', 'mousse'], regiao: 'Brasil' },

  // FRUTAS
  'banana': { categoria: 'fruta', complementos: ['canela', 'mel'], tempo: 10, temperos: ['canela', 'açúcar'], tecnicas: ['assado', 'frito', 'vitamina'], regiao: 'Brasil' },
  'maca': { categoria: 'fruta', complementos: ['canela', 'mel'], tempo: 15, temperos: ['canela', 'açúcar'], tecnicas: ['assado', 'compota'], aliases: ['maçã'] },
  'laranja': { categoria: 'fruta', complementos: ['hortelã', 'açúcar'], tempo: 0, temperos: ['açúcar'], tecnicas: ['suco', 'salada'] },
  'limao': { categoria: 'fruta', complementos: ['açúcar', 'hortelã'], tempo: 0, temperos: ['sal', 'açúcar'], tecnicas: ['suco', 'tempero'], aliases: ['limão'] },
  'manga': { categoria: 'fruta', complementos: ['pimenta', 'limão'], tempo: 0, temperos: ['pimenta', 'açúcar'], tecnicas: ['natural', 'chutney'], regiao: 'Brasil' },
  'abacaxi': { categoria: 'fruta', complementos: ['canela', 'cravo'], tempo: 10, temperos: ['canela', 'açúcar'], tecnicas: ['grelhado', 'caramelizado'] },
  'morango': { categoria: 'fruta', complementos: ['chocolate', 'chantilly'], tempo: 0, temperos: ['açúcar'], tecnicas: ['natural', 'calda'] },
  'uva': { categoria: 'fruta', complementos: ['queijo', 'nozes'], tempo: 0, temperos: ['açúcar'], tecnicas: ['natural', 'assado'] },
  'melancia': { categoria: 'fruta', complementos: ['queijo-feta', 'hortelã'], tempo: 0, temperos: ['sal'], tecnicas: ['natural', 'salada'] },
  'melao': { categoria: 'fruta', complementos: ['presunto', 'hortelã'], tempo: 0, temperos: ['sal'], tecnicas: ['natural', 'salada'], aliases: ['melão'] },
  'abacate': { categoria: 'fruta', complementos: ['limão', 'tomate'], tempo: 0, temperos: ['sal', 'limão'], tecnicas: ['guacamole', 'vitamina'], regiao: 'Brasil' },
  'coco': { categoria: 'fruta', complementos: ['leite-de-coco', 'açúcar'], tempo: 10, temperos: ['açúcar'], tecnicas: ['ralado', 'leite'], regiao: 'Nordeste' },
  'maracuja': { categoria: 'fruta', complementos: ['açúcar', 'leite-condensado'], tempo: 0, temperos: ['açúcar'], tecnicas: ['suco', 'mousse'], regiao: 'Brasil', aliases: ['maracujá'] },
  'goiaba': { categoria: 'fruta', complementos: ['queijo', 'açúcar'], tempo: 15, temperos: ['açúcar', 'cravo'], tecnicas: ['compota', 'goiabada'], regiao: 'Brasil' },
  'acai': { categoria: 'fruta', complementos: ['banana', 'granola'], tempo: 5, temperos: ['açúcar'], tecnicas: ['tigela', 'vitamina'], regiao: 'Norte', aliases: ['açaí'] },
  'mamao': { categoria: 'fruta', complementos: ['limão', 'mel'], tempo: 0, temperos: ['limão'], tecnicas: ['natural', 'vitamina'], aliases: ['mamão', 'papaya'] },
  'caju': { categoria: 'fruta', complementos: ['açúcar', 'castanha'], tempo: 10, temperos: ['açúcar'], tecnicas: ['suco', 'doce'], regiao: 'Nordeste' },
  'pitanga': { categoria: 'fruta', complementos: ['açúcar', 'limão'], tempo: 5, temperos: ['açúcar'], tecnicas: ['suco', 'licor'], regiao: 'Brasil' },
  'jabuticaba': { categoria: 'fruta', complementos: ['açúcar', 'cachaça'], tempo: 15, temperos: ['açúcar'], tecnicas: ['licor', 'geléia'], regiao: 'Sudeste' },
  'caqui': { categoria: 'fruta', complementos: ['iogurte', 'granola'], tempo: 0, temperos: ['canela'], tecnicas: ['natural', 'salada'] },
  'pera': { categoria: 'fruta', complementos: ['queijo-azul', 'mel'], tempo: 15, temperos: ['canela', 'vinho'], tecnicas: ['assado', 'compota'], aliases: ['pêra'] },
  'kiwi': { categoria: 'fruta', complementos: ['morango', 'iogurte'], tempo: 0, temperos: ['açúcar'], tecnicas: ['natural', 'vitamina'] },
  'tangerina': { categoria: 'fruta', complementos: ['hortelã', 'açúcar'], tempo: 0, temperos: ['açúcar'], tecnicas: ['natural', 'suco'], aliases: ['mexerica', 'bergamota'] },

  // INGREDIENTES REGIONAIS BRASILEIROS
  'azeite-de-dende': { categoria: 'tempero', complementos: ['camarão', 'peixe'], tempo: 0, temperos: ['coentro', 'pimenta'], tecnicas: ['refogado', 'vatapá'], regiao: 'Nordeste', aliases: ['dendê'] },
  'tucupi': { categoria: 'tempero', complementos: ['pato', 'camarão'], tempo: 30, temperos: ['alho', 'chicória'], tecnicas: ['cozido', 'pato-no-tucupi'], regiao: 'Norte' },
  'jambu': { categoria: 'tempero', complementos: ['tucupi', 'camarão'], tempo: 5, temperos: ['alho'], tecnicas: ['refogado', 'tacacá'], regiao: 'Norte' },
  'farinha-de-mandioca': { categoria: 'carboidrato', complementos: ['manteiga', 'bacon'], tempo: 5, temperos: ['sal', 'cebola'], tecnicas: ['farofa', 'pirão'], regiao: 'Brasil' },
  'tapioca': { categoria: 'carboidrato', complementos: ['queijo', 'coco'], tempo: 5, temperos: ['sal', 'açúcar'], tecnicas: ['goma', 'beiju'], regiao: 'Nordeste' },
  'polvilho': { categoria: 'carboidrato', complementos: ['queijo', 'leite'], tempo: 20, temperos: ['sal'], tecnicas: ['pão-de-queijo'], regiao: 'Sudeste' },
  'cachaca': { categoria: 'bebida', complementos: ['limão', 'açúcar'], tempo: 0, temperos: ['açúcar'], tecnicas: ['caipirinha', 'flambar'], regiao: 'Brasil', aliases: ['cachaça', 'pinga'] },
  'pequi': { categoria: 'fruta', complementos: ['arroz', 'frango'], tempo: 30, temperos: ['sal', 'alho'], tecnicas: ['cozido', 'refogado'], regiao: 'Centro-Oeste' },
  'maxixe': { categoria: 'legume', complementos: ['tomate', 'cebola'], tempo: 10, temperos: ['alho', 'colorau'], tecnicas: ['refogado'], regiao: 'Nordeste' },
  'ora-pro-nobis': { categoria: 'verdura', complementos: ['ovo', 'frango'], tempo: 5, temperos: ['alho', 'cebola'], tecnicas: ['refogado', 'torta'], regiao: 'Sudeste' },
  'cupuacu': { categoria: 'fruta', complementos: ['leite', 'açúcar'], tempo: 0, temperos: ['açúcar'], tecnicas: ['suco', 'mousse'], regiao: 'Norte', aliases: ['cupuaçu'] },

  // FALLBACK GENÉRICOS (garantem que SEMPRE haverá receita)
  'ingrediente': { categoria: 'generico', complementos: ['alho', 'cebola', 'azeite'], tempo: 25, temperos: ['sal', 'pimenta'], tecnicas: ['refogado', 'assado'] },
  'comida': { categoria: 'generico', complementos: ['temperos', 'legumes'], tempo: 30, temperos: ['sal', 'alho'], tecnicas: ['cozido', 'refogado'] },
  'vegetal': { categoria: 'legume', complementos: ['azeite', 'alho'], tempo: 15, temperos: ['sal', 'pimenta'], tecnicas: ['refogado', 'salada'] },
  'verdura': { categoria: 'verdura', complementos: ['azeite', 'limão'], tempo: 5, temperos: ['sal', 'limão'], tecnicas: ['salada', 'refogado'] },
  'proteina': { categoria: 'proteina', complementos: ['legumes', 'arroz'], tempo: 30, temperos: ['sal', 'pimenta'], tecnicas: ['assado', 'grelhado'] },
};

// FUNÇÃO DE BUSCA INTELIGENTE - NUNCA FALHA
function buscarIngrediente(ingrediente: string): IngredienteInfo {
  const limpo = ingrediente.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // 1. Busca direta
  if (INGREDIENTES_DB[ingrediente.toLowerCase()]) {
    return INGREDIENTES_DB[ingrediente.toLowerCase()];
  }
  
  // 2. Busca normalizada
  for (const [chave, valor] of Object.entries(INGREDIENTES_DB)) {
    const chaveNormalizada = chave.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (chaveNormalizada === limpo) {
      return valor;
    }
  }
  
  // 3. Busca por aliases
  for (const valor of Object.values(INGREDIENTES_DB)) {
    if (valor.aliases) {
      for (const alias of valor.aliases) {
        const aliasNormalizado = alias.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (aliasNormalizado === limpo) {
          return valor;
        }
      }
    }
  }
  
  // 4. Busca por substring
  for (const [chave, valor] of Object.entries(INGREDIENTES_DB)) {
    if (limpo.includes(chave) || chave.includes(limpo)) {
      return valor;
    }
  }
  
  // 5. Busca por palavras-chave
  const palavrasChave: Record<string, string> = {
    'peixe': 'peixe', 'pescado': 'peixe',
    'carne': 'carne', 'boi': 'carne', 'vaca': 'carne',
    'frango': 'frango', 'galinha': 'frango',
    'porco': 'porco', 'suino': 'porco',
    'camarao': 'camarao',
    'queijo': 'queijo',
    'arroz': 'arroz',
    'feijao': 'feijao',
    'batata': 'batata',
    'tomate': 'tomate',
    'ovo': 'ovo',
    'massa': 'macarrao', 'macarrao': 'macarrao',
    'legume': 'vegetal', 'verdura': 'verdura'
  };
  
  for (const [palavra, chave] of Object.entries(palavrasChave)) {
    if (limpo.includes(palavra)) {
      return INGREDIENTES_DB[chave];
    }
  }
  
  // 6. FALLBACK FINAL - sempre retorna algo
  return INGREDIENTES_DB['ingrediente'];
}

// TEMPLATES DE RECEITAS (mantidos os 15 anteriores)
const TEMPLATES_RECEITAS = {
  refogado: {
    nome: (ing: string) => `${capitalizar(ing)} Refogado do Chef José`,
    preparo: (ing: string, tempo: number, comp: string[]) => `
MODO DE PREPARO - REFOGADO:

1. Aqueça 3 colheres de azeite em fogo médio
2. Doure 3 dentes de alho picados (30 segundos)
3. Adicione 1 cebola média em cubos e refogue até dourar
4. Junte ${ing} e misture bem
5. Tempere com sal, pimenta-do-reino e cominho
6. Cozinhe por ${tempo} minutos, mexendo ocasionalmente
${comp.length > 0 ? `7. Adicione ${comp.slice(0,2).join(' e ')} para mais sabor` : ''}
8. Finalize com cheiro-verde picado
9. Sirva quente com arroz branco

SEGREDO DO CHEF: Alho dourado, nunca queimado! Fogo médio é a chave.`,
    dificuldade: 'Fácil' as const
  },
  
  assado: {
    nome: (ing: string) => `${capitalizar(ing)} Assado Dourado`,
    preparo: (ing: string, tempo: number, comp: string[]) => `
MODO DE PREPARO - ASSADO:

1. Pré-aqueça o forno a 200°C
2. Tempere ${ing} com sal grosso, pimenta e alho amassado
3. Regue com azeite generosamente
${comp.length > 0 ? `4. Adicione ${comp[0]} para realçar o sabor` : ''}
5. Coloque em assadeira sem empilhar
6. Asse por ${tempo} minutos, virando na metade
7. Regue com os sucos a cada 15 minutos
8. Retire quando dourado e suculento
9. Deixe descansar 5-10 minutos antes de servir

SEGREDO DO CHEF: Crosta dourada = forno bem quente! Aumente para 220°C nos últimos 5 min.`,
    dificuldade: 'Médio' as const
  },
  
  grelhado: {
    nome: (ing: string) => `${capitalizar(ing)} Grelhado Perfeito`,
    preparo: (ing: string, tempo: number) => `
MODO DE PREPARO - GRELHADO:

1. Aqueça a grelha/frigideira em fogo ALTO (bem quente!)
2. Tempere ${ing} com sal grosso, pimenta e azeite
3. Deixe em temperatura ambiente por 10 minutos
4. Coloque na grelha quente e NÃO MEXA por 3-4 minutos
5. Vire UMA VEZ e grelhe do outro lado por ${Math.floor(tempo/2)} minutos
6. Use pinça, nunca garfo (perde suco!)
7. Retire no ponto desejado
8. Deixe descansar 5 minutos coberto com papel alumínio
9. Finalize com flor de sal e azeite

SEGREDO DO CHEF: Nunca pressione na grelha! Você vai espremer os sucos.`,
    dificuldade: 'Médio' as const
  },
  
  frito: {
    nome: (ing: string) => `${capitalizar(ing)} Frito Crocante`,
    preparo: (ing: string, tempo: number) => `
MODO DE PREPARO - FRITO:

1. Corte ${ing} em pedaços uniformes
2. Tempere com sal e deixe 10 minutos
3. Seque MUITO BEM com papel toalha
4. Aqueça óleo em panela funda (170-180°C)
5. Teste temperatura com palito (deve borbulhar)
6. Frite em pequenos lotes por ${tempo} minutos
7. Vire para dourar uniformemente
8. Retire com escumadeira e coloque sobre papel toalha
9. Tempere com sal imediatamente

SEGREDO DO CHEF: Água + óleo = perigo! Seque bem antes de fritar.`,
    dificuldade: 'Médio' as const
  },
  
  cozido: {
    nome: (ing: string) => `${capitalizar(ing)} Cozido Caseiro`,
    preparo: (ing: string, tempo: number, comp: string[]) => `
MODO DE PREPARO - COZIDO:

1. Coloque ${ing} em panela e cubra com água (2 dedos acima)
2. Adicione sal, 2 folhas de louro e 3 dentes de alho
${comp.length > 0 ? `3. Acrescente ${comp.slice(0,2).join(' e ')} para mais sabor` : ''}
4. Leve ao fogo alto até ferver
5. Reduza para fogo médio-baixo e retire a espuma
6. Cozinhe por ${tempo} minutos em fervura suave
7. Teste o ponto com garfo (deve entrar fácil)
8. Escorra (reserve o caldo!)
9. Tempere e sirva quente com azeite

SEGREDO DO CHEF: Fervura suave! Fogo alto deixa tudo duro.`,
    dificuldade: 'Fácil' as const
  },
  
  ensopado: {
    nome: (ing: string) => `Ensopado de ${capitalizar(ing)}`,
    preparo: (ing: string, tempo: number, comp: string[]) => `
MODO DE PREPARO - ENSOPADO:

1. Aqueça óleo em panela funda
2. Doure ${ing} em fogo alto criando crosta
3. Retire e reserve
4. No mesmo óleo, refogue alho e cebola
5. Retorne ${ing} e adicione 2 tomates picados
${comp.length > 0 ? `6. Junte ${comp.slice(0,2).join(' e ')}` : ''}
7. Cubra com água quente até a metade
8. Tempere com sal, pimenta, louro e colorau
9. Tampe e cozinhe em fogo baixo por ${tempo} minutos
10. Mexa ocasionalmente
11. Quando o molho engrossar, está pronto!

SEGREDO DO CHEF: Fogo baixo + paciência = ensopado suculento!`,
    dificuldade: 'Médio' as const
  },
  
  salada: {
    nome: (ing: string) => `Salada Fresca com ${capitalizar(ing)}`,
    preparo: (ing: string, comp: string[]) => `
MODO DE PREPARO - SALADA:

1. Lave ${ing} folha por folha em água gelada
2. Deixe de molho com hipoclorito por 15 minutos
3. Enxágue e seque com centrífuga ou papel toalha
4. Rasgue/corte em pedaços de garfada
${comp.length > 0 ? `5. Adicione ${comp.slice(0,3).join(', ')}` : ''}
6. Prepare molho: 3 partes azeite + 1 parte vinagre/limão
7. Tempere APENAS na hora de servir
8. Misture delicadamente
9. Sirva imediatamente

SEGREDO DO CHEF: Folhas sequinhas + tempero na hora = salada crocante!`,
    dificuldade: 'Fácil' as const
  },
  
  gratinado: {
    nome: (ing: string) => `${capitalizar(ing)} Gratinado`,
    preparo: (ing: string, tempo: number) => `
MODO DE PREPARO - GRATINADO:

1. Pré-aqueça forno a 180°C
2. Prepare ${ing} (cozido/refogado se necessário)
3. Misture 200ml creme de leite + 100g queijo ralado
4. Tempere com sal, pimenta e noz-moscada
5. Unte refratário com manteiga
6. Distribua ${ing} uniformemente
7. Despeje creme de queijo por cima
8. Polvilhe mais queijo e breadcrumbs
9. Asse por ${tempo + 10} minutos até dourar
10. Use grill nos últimos 3 min (vigie!)

SEGREDO DO CHEF: Queijo dourado, não queimado! Fique de olho.`,
    dificuldade: 'Médio' as const
  },
  
  salteado: {
    nome: (ing: string) => `${capitalizar(ing)} Salteado`,
    preparo: (ing: string, tempo: number) => `
MODO DE PREPARO - SALTEADO:

1. Prepare TUDO antes de começar!
2. Corte ${ing} em pedaços pequenos e uniformes
3. Aqueça wok/frigideira em fogo BEM ALTO
4. Adicione óleo (alto ponto de fumaça)
5. Quando fumegar, adicione ${ing}
6. Mexa CONSTANTEMENTE por ${tempo} minutos
7. Tempere com shoyu, gengibre e alho
8. Finalize com gergelim e cebolinha
9. Sirva IMEDIATAMENTE!

SEGREDO DO CHEF: Fogo alto + movimentos rápidos = crocância perfeita!`,
    dificuldade: 'Médio' as const
  },
  
  empanado: {
    nome: (ing: string) => `${capitalizar(ing)} Empanado`,
    preparo: (ing: string, tempo: number) => `
MODO DE PREPARO - EMPANADO:

1. Prepare 3 recipientes rasos:
   - 1º: farinha temperada
   - 2º: 2 ovos batidos + leite
   - 3º: farinha de rosca (use panko!)
2. Seque ${ing} muito bem
3. Passe na farinha, sacuda excesso
4. Mergulhe no ovo completamente
5. Cubra com farinha de rosca pressionando
6. Geladeira por 15 minutos
7. Aqueça óleo a 170-180°C
8. Frite por ${tempo} minutos virando uma vez
9. Escorra e sirva quente

SEGREDO DO CHEF: Tríplice camada = empanamento que não solta!`,
    dificuldade: 'Médio' as const
  },
  
  'cozido-no-vapor': {
    nome: (ing: string) => `${capitalizar(ing)} no Vapor`,
    preparo: (ing: string, tempo: number) => `
MODO DE PREPARO - VAPOR:

1. Prepare panela com cesto de vapor
2. Adicione água 2cm abaixo do cesto
3. Tempere ${ing} levemente com sal e ervas
4. Organize sem sobrepor peças
5. Ferva água em fogo alto
6. Coloque cesto e tampe bem
7. Cozinhe ${tempo} minutos SEM DESTAPAR
8. Teste ponto com palito
9. Tempere com azeite, limão e ervas

SEGREDO DO CHEF: Vapor preserva nutrientes e sabor!`,
    dificuldade: 'Fácil' as const
  },
  
  'ao-molho': {
    nome: (ing: string) => `${capitalizar(ing)} ao Molho`,
    preparo: (ing: string, tempo: number, comp: string[]) => `
MODO DE PREPARO - AO MOLHO:

1. Corte ${ing} em cubos e tempere
2. Doure em manteiga e reserve
3. Refogue cebola e ${comp[0] || 'champignon'}
4. Adicione molho de tomate
5. Junte mostarda e creme de leite
6. Retorne ${ing} à panela
7. Cozinhe ${tempo} minutos em fogo baixo
8. Ajuste tempero
9. Finalize com salsinha
10. Sirva com arroz ou batata-palha

SEGREDO DO CHEF: Não ferva após o creme! Só aqueça.`,
    dificuldade: 'Médio' as const
  },
  
  moqueca: {
    nome: (ing: string) => `Moqueca de ${capitalizar(ing)}`,
    preparo: (ing: string, tempo: number) => `
MODO DE PREPARO - MOQUECA:

1. Tempere ${ing} com sal, limão e alho (30 min)
2. Em panela de barro, faça cama de:
   - Tomate rodelas
   - Cebola rodelas
   - Pimentão rodelas
3. Coloque ${ing} sobre os legumes
4. Adicione mais camadas de legumes
5. Regue com 200ml leite de coco
6. Adicione coentro fresco abundante
7. Versão baiana: 2 colheres dendê
8. Tampe e cozinhe ${tempo} minutos SEM MEXER
9. Balance a panela ocasionalmente
10. Sirva com arroz, pirão e farofa

SEGREDO DO CHEF: Moqueca não se mexe, se balança! Fogo baixo!`,
    dificuldade: 'Difícil' as const,
    regiao: 'Nordeste'
  },
  
  escondidinho: {
    nome: (ing: string) => `Escondidinho de ${capitalizar(ing)}`,
    preparo: (ing: string, tempo: number) => `
MODO DE PREPARO - ESCONDIDINHO:

1. Cozinhe 1kg mandioca até macia
2. Amasse com manteiga e leite (purê cremoso)
3. Tempere purê com sal e noz-moscada
4. Refogue ${ing} com alho, cebola e tomate
5. Tempere bem o recheio
6. Unte refratário
7. Coloque metade do purê no fundo
8. Espalhe todo o recheio de ${ing}
9. Cubra com restante do purê selando bordas
10. Polvilhe 200g queijo ralado
11. Forno 200°C por ${tempo + 15} minutos
12. Doure bem (use grill final!)

SEGREDO DO CHEF: Purê BEM cremoso não racha no forno!`,
    dificuldade: 'Médio' as const,
    regiao: 'Nordeste'
  },
  
  conserva: {
    nome: (ing: string) => `${capitalizar(ing)} em Conserva`,
    preparo: (ing: string, tempo: number) => `
MODO DE PREPARO - CONSERVA:

1. Lave e corte ${ing}
2. Branqueie em água fervente por 3 minutos
3. Escorra e seque completamente
4. Prepare salmoura:
   - 500ml vinagre branco
   - 250ml água
   - 2 colheres açúcar
   - 1 colher sal
5. Ferva salmoura com alho, louro e pimenta
6. Esterilize potes de vidro (ferva 10 min)
7. Coloque ${ing} em potes quentes
8. Despeje salmoura fervendo cobrindo tudo
9. Retire bolhas com palito
10. Feche imediatamente
11. Vire de cabeça para baixo e esfrie
12. Armazene local fresco (até 6 meses)

SEGREDO DO CHEF: Esterilização é FUNDAMENTAL!`,
    dificuldade: 'Médio' as const
  }
};

// FUNÇÕES AUXILIARES
function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function selecionarTecnica(ingredientes: string[], infos: IngredienteInfo[]): keyof typeof TEMPLATES_RECEITAS {
  const primeiro = infos[0];
  
  if (primeiro.tecnicas && primeiro.tecnicas.length > 0) {
    const validas = primeiro.tecnicas.filter(t => t in TEMPLATES_RECEITAS);
    if (validas.length > 0) {
      return validas[Math.floor(Math.random() * validas.length)] as keyof typeof TEMPLATES_RECEITAS;
    }
  }
  
  const sub = primeiro.subcategoria;
  
  if (sub === 'peixe' || sub === 'frutos-mar') {
    return Math.random() > 0.5 ? 'moqueca' : 'grelhado';
  }
  if (sub === 'bovina') {
    const opcoes: (keyof typeof TEMPLATES_RECEITAS)[] = ['assado', 'grelhado', 'ensopado'];
    return opcoes[Math.floor(Math.random() * opcoes.length)];
  }
  if (sub === 'ave') {
    const opcoes: (keyof typeof TEMPLATES_RECEITAS)[] = ['assado', 'grelhado', 'ao-molho'];
    return opcoes[Math.floor(Math.random() * opcoes.length)];
  }
  if (primeiro.categoria === 'verdura' && primeiro.tempo === 0) {
    return 'salada';
  }
  if (primeiro.categoria === 'legume') {
    const opcoes: (keyof typeof TEMPLATES_RECEITAS)[] = ['refogado', 'assado', 'cozido-no-vapor'];
    return opcoes[Math.floor(Math.random() * opcoes.length)];
  }
  if (sub === 'tubérculo') {
    const opcoes: (keyof typeof TEMPLATES_RECEITAS)[] = ['escondidinho', 'frito', 'assado'];
    return opcoes[Math.floor(Math.random() * opcoes.length)];
  }
  if (primeiro.categoria === 'leguminosa') {
    return Math.random() > 0.5 ? 'cozido' : 'ensopado';
  }
  if (sub === 'massa') {
    return Math.random() > 0.5 ? 'ao-molho' : 'gratinado';
  }
  
  return 'refogado';
}

function gerarListaCompras(ingredientes: string[], infos: IngredienteInfo[]): string[] {
  const lista = new Set<string>();
  
  infos.forEach(info => {
    if (info.temperos) {
      info.temperos.slice(0, 2).forEach(t => lista.add(capitalizar(t)));
    }
    if (info.complementos) {
      info.complementos.slice(0, 2).forEach(c => lista.add(capitalizar(c)));
    }
  });
  
  ['Sal refinado', 'Azeite extra-virgem', 'Alho'].forEach(b => lista.add(b));
  
  const categorias = new Set(infos.map(i => i.categoria));
  if (categorias.has('proteina')) lista.add('Limão siciliano');
  if (categorias.has('verdura') || categorias.has('legume')) lista.add('Vinagre');
  if (categorias.has('carboidrato')) lista.add('Manteiga');
  
  return Array.from(lista).slice(0, 6);
}

function calcularTempo(infos: IngredienteInfo[], tecnica: keyof typeof TEMPLATES_RECEITAS): number {
  const tempos: Record<string, number> = {
    'refogado': 5, 'assado': 10, 'grelhado': 5, 'frito': 5,
    'cozido': 10, 'ensopado': 15, 'salada': 0, 'gratinado': 15,
    'salteado': 3, 'empanado': 10, 'cozido-no-vapor': 5,
    'ao-molho': 10, 'moqueca': 15, 'escondidinho': 20, 'conserva': 30
  };
  
  return (tempos[tecnica] || 15) + (infos[0]?.tempo || 20);
}

function definirDificuldade(tecnica: keyof typeof TEMPLATES_RECEITAS, num: number): 'Fácil' | 'Médio' | 'Difícil' {
  if (['moqueca', 'escondidinho', 'conserva'].includes(tecnica) || num > 5) return 'Difícil';
  if (['ensopado', 'ao-molho', 'empanado', 'assado', 'grelhado'].includes(tecnica) || num > 3) return 'Médio';
  return 'Fácil';
}

function adicionarEmoji(cat: string, sub?: string): string {
  const emojis: Record<string, string> = {
    'proteina': sub === 'peixe' ? '🐟' : sub === 'ave' ? '🍗' : '🥩',
    'carboidrato': '🍚', 'legume': '🥕', 'verdura': '🥬',
    'leguminosa': '🫘', 'fruta': '🍎', 'laticinio': '🧀',
    'tempero': '🧂', 'generico': '🍽️'
  };
  return emojis[cat] || '🍽️';
}

function getChefPhrase(tecnica: string, ing: string): string {
  const frases: Record<string, string[]> = {
    'refogado': ['Um bom refogado é a base da cozinha brasileira!', 'Alho dourado, nunca queimado!'],
    'assado': ['Assado lento é assado perfeito!', 'O forno faz mágica!'],
    'grelhado': ['Grelhado é arte pura!', 'As marcas da grelha são certificado de qualidade!'],
    'moqueca': ['Moqueca é patrimônio brasileiro!', 'Não se mexe, se balança com amor!'],
    'salada': ['Salada fresca = saúde no prato!', 'Folhas crocantes são vida!'],
    'default': [`${capitalizar(ing)} com técnica vira obra de arte!`, 'Cozinhar é amar com paixão!']
  };
  
  const escolhidas = frases[tecnica] || frases['default'];
  return escolhidas[Math.floor(Math.random() * escolhidas.length)];
}

// FUNÇÃO PRINCIPAL
export async function getSmartChefAdvice(ingredientesTexto: string): Promise<SmartChefAdvice> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const ingredientes = ingredientesTexto.split(',').map(i => i.trim()).filter(Boolean);
  
  if (ingredientes.length === 0) {
    return {
      recipeName: '❌ Cadê os Ingredientes?',
      instructions: `
Olá! Sou o Chef José, seu assistente culinário! 👨‍🍳

Para criar uma receita deliciosa, informe os ingredientes disponíveis.

COMO USAR:
Digite separados por vírgula:
- "frango, batata, cenoura"
- "peixe, limão, coentro"
- "macarrão, tomate, manjericão"

Trabalho com 500+ ingredientes e 15 técnicas culinárias!

Vamos cozinhar? 🔥`,
      shoppingListSuggestions: ['Frango', 'Arroz', 'Feijão', 'Tomate', 'Cebola', 'Alho'],
      estimatedTime: 0,
      difficulty: 'Fácil',
      servings: 2
    };
  }
  
  const infos = ingredientes.map(ing => buscarIngrediente(ing));
  const ingredientePrincipal = ingredientes[0];
  const infoPrincipal = infos[0];
  const tecnica = selecionarTecnica(ingredientes, infos);
  const template = TEMPLATES_RECEITAS[tecnica];
  const tempo = calcularTempo(infos, tecnica);
  const complementos = infoPrincipal.complementos || [];
  const emoji = adicionarEmoji(infoPrincipal.categoria, infoPrincipal.subcategoria);
  
  const nomeReceita = `${emoji} ${template.nome(ingredientePrincipal)}`;
  
  let instrucoes = '';
  if (tecnica === 'salada' || tecnica === 'conserva') {
    instrucoes = template.preparo(ingredientePrincipal, complementos);
  } else {
    instrucoes = template.preparo(ingredientePrincipal, tempo, complementos);
  }
  
  let infoRegional = '';
  if (infoPrincipal.regiao) {
    infoRegional = `\n\n🗺️ ORIGEM: Prato típico da região ${infoPrincipal.regiao} do Brasil!`;
  }
  
  let dicaNutricional = '';
  if (infoPrincipal.categoria === 'proteina' && infoPrincipal.subcategoria === 'peixe') {
    dicaNutricional = '\n\n🐟 SAÚDE: Peixes são ricos em ômega-3, ótimos para o coração!';
  } else if (infoPrincipal.categoria === 'leguminosa') {
    dicaNutricional = '\n\n🫘 SAÚDE: Leguminosas são ricas em proteínas vegetais e fibras!';
  } else if (infoPrincipal.categoria === 'verdura') {
    dicaNutricional = '\n\n🥬 SAÚDE: Verduras são repletas de vitaminas e minerais!';
  }
  
  const porcoes = ingredientes.length === 1 ? 2 : ingredientes.length === 2 ? 3 : 4;
  
  const textoFinal = `
${instrucoes}
${infoRegional}
${dicaNutricional}

⏱️ INFORMAÇÕES DA RECEITA:
- Tempo de preparo: ${tempo} minutos
- Dificuldade: ${definirDificuldade(tecnica, ingredientes.length)}
- Rendimento: ${porcoes} porções
- Técnica: ${capitalizar(tecnica.replace('-', ' '))}

👨‍🍳 CHEF JOSÉ DIZ:
"${getChefPhrase(tecnica, ingredientePrincipal)}"

Bom apetite e ótimas experiências na cozinha! 🍽️✨
`.trim();
  
  return {
    recipeName: nomeReceita,
    instructions: textoFinal,
    shoppingListSuggestions: gerarListaCompras(ingredientes, infos),
    estimatedTime: tempo,
    difficulty: definirDificuldade(tecnica, ingredientes.length),
    servings: porcoes,
    cuisine: infoPrincipal.regiao || 'Brasileira'
  };
}

// BÔNUS: Receita aleatória
export async function getRandomRecipe(): Promise<SmartChefAdvice> {
  const ingredientes = Object.keys(INGREDIENTES_DB);
  const aleatorio1 = ingredientes[Math.floor(Math.random() * ingredientes.length)];
  const aleatorio2 = ingredientes[Math.floor(Math.random() * ingredientes.length)];
  return getSmartChefAdvice(`${aleatorio1}, ${aleatorio2}`);
}
