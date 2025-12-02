import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface CelestialObject {
  id: number;
  name: string;
  x: number;
  y: number;
  brightness: number;
  category: 'brightest' | 'planet' | 'deep-space';
  type: 'star' | 'planet' | 'nebula' | 'galaxy' | 'cluster';
  constellation?: string;
  distance?: string;
  description: string;
  facts?: string[];
  magnitude?: number;
}

const celestialObjects: CelestialObject[] = [
  {
    id: 1,
    name: 'Сириус',
    x: 25,
    y: 45,
    brightness: 5.5,
    category: 'brightest',
    type: 'star',
    constellation: 'Большой Пёс',
    distance: '8.6 световых лет',
    magnitude: -1.46,
    description: 'Ярчайшая звезда ночного неба, двойная звёздная система.',
    facts: [
      'Самая яркая звезда на небе после Солнца',
      'Имеет спутник - белый карлик Сириус B',
      'Температура поверхности около 9,940 К',
      'Видна из обоих полушарий Земли'
    ]
  },
  {
    id: 2,
    name: 'Венера',
    x: 70,
    y: 30,
    brightness: 5,
    category: 'planet',
    type: 'planet',
    distance: '38-261 млн км',
    magnitude: -4.6,
    description: 'Вторая планета от Солнца, самый яркий объект на небе после Солнца и Луны.',
    facts: [
      'Температура поверхности около 465°C',
      'Один день длится 243 земных суток',
      'Вращается в обратном направлении',
      'Плотная атмосфера из углекислого газа'
    ]
  },
  {
    id: 3,
    name: 'Юпитер',
    x: 40,
    y: 60,
    brightness: 4.8,
    category: 'planet',
    type: 'planet',
    distance: '588-968 млн км',
    magnitude: -2.94,
    description: 'Крупнейшая планета Солнечной системы, газовый гигант.',
    facts: [
      'Масса больше всех планет системы вместе взятых',
      'Имеет 95 известных спутников',
      'Большое Красное Пятно - гигантский ураган',
      'Один оборот вокруг оси за 10 часов'
    ]
  },
  {
    id: 4,
    name: 'Марс',
    x: 55,
    y: 50,
    brightness: 4.3,
    category: 'planet',
    type: 'planet',
    distance: '55-400 млн км',
    magnitude: -2.91,
    description: 'Четвёртая планета от Солнца, известная как "Красная планета".',
    facts: [
      'Красный цвет из-за оксида железа',
      'Есть полярные ледяные шапки',
      'Самая высокая гора в Солнечной системе - Олимп',
      'Атмосфера на 95% состоит из CO2'
    ]
  },
  {
    id: 5,
    name: 'Канопус',
    x: 15,
    y: 70,
    brightness: 5.2,
    category: 'brightest',
    type: 'star',
    constellation: 'Киль',
    distance: '310 световых лет',
    magnitude: -0.74,
    description: 'Вторая по яркости звезда ночного неба, белый гигант.',
    facts: [
      'В 71 раз больше Солнца',
      'Светимость в 10,000 раз больше солнечной',
      'Используется для навигации космических аппаратов',
      'Видна только в южных широтах'
    ]
  },
  {
    id: 6,
    name: 'Туманность Ориона',
    x: 45,
    y: 35,
    brightness: 4.5,
    category: 'deep-space',
    type: 'nebula',
    constellation: 'Орион',
    distance: '1,344 световых года',
    magnitude: 4.0,
    description: 'Диффузная туманность, область активного звездообразования.',
    facts: [
      'Одна из ближайших областей звездообразования',
      'Видна невооружённым глазом',
      'Размер около 24 световых лет',
      'Содержит более 700 молодых звёзд'
    ]
  },
  {
    id: 7,
    name: 'Арктур',
    x: 80,
    y: 55,
    brightness: 5.3,
    category: 'brightest',
    type: 'star',
    constellation: 'Волопас',
    distance: '36.7 световых лет',
    magnitude: -0.05,
    description: 'Ярчайшая звезда северного небесного полушария, красный гигант.',
    facts: [
      'Одна из самых близких красных гигантов',
      'Движется со скоростью 122 км/с',
      'Возраст около 7.1 миллиарда лет',
      'Диаметр в 25 раз больше Солнца'
    ]
  },
  {
    id: 8,
    name: 'Сатурн',
    x: 30,
    y: 25,
    brightness: 4.6,
    category: 'planet',
    type: 'planet',
    distance: '1.2-1.7 млрд км',
    magnitude: 0.46,
    description: 'Шестая планета от Солнца, известная своими кольцами.',
    facts: [
      'Кольца состоят из льда и камней',
      'Имеет 146 известных спутников',
      'Плотность меньше, чем у воды',
      'Один год длится 29.5 земных лет'
    ]
  },
  {
    id: 9,
    name: 'Вега',
    x: 65,
    y: 20,
    brightness: 5.1,
    category: 'brightest',
    type: 'star',
    constellation: 'Лира',
    distance: '25 световых лет',
    magnitude: 0.03,
    description: 'Одна из самых ярких звёзд северного неба, голубая звезда.',
    facts: [
      'Вторая по яркости звезда северного полушария',
      'Используется как эталон звёздных величин',
      'Вращается очень быстро - 274 км/с',
      'Возраст около 455 миллионов лет'
    ]
  },
  {
    id: 10,
    name: 'Галактика Андромеды',
    x: 50,
    y: 75,
    brightness: 4.0,
    category: 'deep-space',
    type: 'galaxy',
    constellation: 'Андромеда',
    distance: '2.5 млн световых лет',
    magnitude: 3.44,
    description: 'Ближайшая к Млечному Пути крупная галактика, спиральная галактика.',
    facts: [
      'Содержит около триллиона звёзд',
      'Движется к Млечному Пути со скоростью 110 км/с',
      'Столкновение с Млечным Путём через 4.5 млрд лет',
      'Видна невооружённым глазом в тёмном небе'
    ]
  },
  {
    id: 11,
    name: 'Плеяды',
    x: 35,
    y: 80,
    brightness: 4.2,
    category: 'deep-space',
    type: 'cluster',
    constellation: 'Телец',
    distance: '444 световых года',
    magnitude: 1.6,
    description: 'Рассеянное звёздное скопление, состоящее из горячих голубых звёзд.',
    facts: [
      'Содержит около 1,000 звёзд',
      'Возраст около 100 миллионов лет',
      'Видно невооружённым глазом 6-7 ярких звёзд',
      'Окружены газопылевой туманностью'
    ]
  },
  {
    id: 12,
    name: 'Бетельгейзе',
    x: 20,
    y: 55,
    brightness: 5.0,
    category: 'brightest',
    type: 'star',
    constellation: 'Орион',
    distance: '640 световых лет',
    magnitude: 0.42,
    description: 'Красный сверхгигант, одна из крупнейших известных звёзд.',
    facts: [
      'Диаметр в 700-900 раз больше Солнца',
      'Скоро взорвётся как сверхновая (в течение 100,000 лет)',
      'Яркость переменная, меняется со временем',
      'Если бы была на месте Солнца, поглотила бы орбиту Марса'
    ]
  },
  {
    id: 13,
    name: 'Крабовидная туманность',
    x: 75,
    y: 70,
    brightness: 3.8,
    category: 'deep-space',
    type: 'nebula',
    constellation: 'Телец',
    distance: '6,500 световых лет',
    magnitude: 8.4,
    description: 'Остаток сверхновой, зафиксированной в 1054 году китайскими астрономами.',
    facts: [
      'Расширяется со скоростью 1,500 км/с',
      'Содержит пульсар, вращающийся 30 раз в секунду',
      'Диаметр около 11 световых лет',
      'Излучает во всех диапазонах спектра'
    ]
  },
  {
    id: 14,
    name: 'Ригель',
    x: 60,
    y: 85,
    brightness: 5.4,
    category: 'brightest',
    type: 'star',
    constellation: 'Орион',
    distance: '860 световых лет',
    magnitude: 0.13,
    description: 'Голубой сверхгигант, седьмая по яркости звезда ночного неба.',
    facts: [
      'Светимость в 120,000 раз больше солнечной',
      'Температура поверхности около 11,000 К',
      'Тройная звёздная система',
      'Одна из самых мощных звёзд в ближайшей окрестности'
    ]
  },
  {
    id: 15,
    name: 'Меркурий',
    x: 85,
    y: 40,
    brightness: 4.1,
    category: 'planet',
    type: 'planet',
    distance: '77-222 млн км',
    magnitude: -1.9,
    description: 'Самая близкая к Солнцу планета, самая маленькая в Солнечной системе.',
    facts: [
      'День длится 176 земных суток',
      'Температура от -173°C ночью до +427°C днём',
      'Почти нет атмосферы',
      'Поверхность похожа на Луну - покрыта кратерами'
    ]
  }
];

const generateBackgroundStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `bg-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.7 + 0.3,
    delay: Math.random() * 3
  }));
};

export default function Index() {
  const [objects] = useState<CelestialObject[]>(celestialObjects);
  const [backgroundStars] = useState(generateBackgroundStars(200));
  const [selectedObject, setSelectedObject] = useState<CelestialObject | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CelestialObject[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = objects.filter(obj =>
        obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obj.constellation?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, objects]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      const newX = e.clientX - panStart.x;
      const newY = e.clientY - panStart.y;
      setPanOffset({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * 0.5;
    setPanOffset(prev => ({
      x: prev.x - delta * 0.3,
      y: prev.y - delta * 0.3
    }));
  };

  const getFilteredObjects = () => {
    if (categoryFilter === 'all') return objects;
    return objects.filter(obj => obj.category === categoryFilter);
  };

  const getObjectColor = (obj: CelestialObject) => {
    switch (obj.type) {
      case 'planet': return '#ffd43b';
      case 'nebula': return '#ff6b9d';
      case 'galaxy': return '#a5d8ff';
      case 'cluster': return '#b197fc';
      default: return obj.brightness > 5 ? '#ffffff' : '#e0e7ff';
    }
  };

  const getObjectSize = (brightness: number) => {
    return Math.max(3, brightness * 0.8);
  };

  const handleObjectClick = (obj: CelestialObject, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedObject(obj);
  };

  const handleSuggestionClick = (obj: CelestialObject) => {
    setSelectedObject(obj);
    setSearchQuery('');
    setShowSuggestions(false);
    setPanOffset({
      x: (50 - obj.x) * 10,
      y: (50 - obj.y) * 10
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="Sparkles" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold hidden sm:block">Звёздное небо</h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск объектов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowSuggestions(true)}
              className="pl-10"
            />
            {showSuggestions && suggestions.length > 0 && (
              <Card className="absolute top-full mt-2 w-full z-50 max-h-80 overflow-auto">
                <CardContent className="p-2">
                  {suggestions.map((obj) => (
                    <button
                      key={obj.id}
                      onClick={() => handleSuggestionClick(obj)}
                      className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors flex items-center gap-3"
                    >
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: getObjectColor(obj) }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{obj.name}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {obj.constellation ? `${obj.constellation} • ` : ''}{obj.type === 'star' ? 'Звезда' : obj.type === 'planet' ? 'Планета' : obj.type === 'nebula' ? 'Туманность' : obj.type === 'galaxy' ? 'Галактика' : 'Скопление'}
                        </div>
                      </div>
                      <Badge variant="outline" className="flex-shrink-0">
                        {obj.distance}
                      </Badge>
                    </button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Icon name="Menu" size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Icon name="Layers" size={20} />
                  Категории объектов
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-120px)] mt-6">
                <div className="space-y-2">
                  <Button
                    variant={categoryFilter === 'all' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setCategoryFilter('all')}
                  >
                    <Icon name="Globe" size={18} className="mr-2" />
                    Все объекты
                    <Badge variant="secondary" className="ml-auto">
                      {objects.length}
                    </Badge>
                  </Button>

                  <Button
                    variant={categoryFilter === 'brightest' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setCategoryFilter('brightest')}
                  >
                    <Icon name="Star" size={18} className="mr-2" />
                    Ярчайшие звёзды
                    <Badge variant="secondary" className="ml-auto">
                      {objects.filter(o => o.category === 'brightest').length}
                    </Badge>
                  </Button>

                  <Button
                    variant={categoryFilter === 'planet' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setCategoryFilter('planet')}
                  >
                    <Icon name="Circle" size={18} className="mr-2" />
                    Планеты
                    <Badge variant="secondary" className="ml-auto">
                      {objects.filter(o => o.category === 'planet').length}
                    </Badge>
                  </Button>

                  <Button
                    variant={categoryFilter === 'deep-space' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setCategoryFilter('deep-space')}
                  >
                    <Icon name="Telescope" size={18} className="mr-2" />
                    Глубокий космос
                    <Badge variant="secondary" className="ml-auto">
                      {objects.filter(o => o.category === 'deep-space').length}
                    </Badge>
                  </Button>
                </div>

                <div className="mt-8 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Icon name="Info" size={18} />
                    Управление
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex gap-2">
                      <Icon name="Move" size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                      <p>Перетаскивайте карту мышью</p>
                    </div>
                    <div className="flex gap-2">
                      <Icon name="MousePointer2" size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                      <p>Прокручивайте колесом мыши для навигации</p>
                    </div>
                    <div className="flex gap-2">
                      <Icon name="MousePointerClick" size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                      <p>Нажмите на объект для детальной информации</p>
                    </div>
                    <div className="flex gap-2">
                      <Icon name="Search" size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                      <p>Используйте поиск с автодополнением</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Icon name="Palette" size={18} />
                    Легенда
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_8px_white]" />
                      <span className="text-sm">Яркие звёзды</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#ffd43b] shadow-[0_0_6px_#ffd43b]" />
                      <span className="text-sm">Планеты</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#ff6b9d] shadow-[0_0_6px_#ff6b9d]" />
                      <span className="text-sm">Туманности</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#a5d8ff] shadow-[0_0_6px_#a5d8ff]" />
                      <span className="text-sm">Галактики</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#b197fc] shadow-[0_0_6px_#b197fc]" />
                      <span className="text-sm">Скопления</span>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="pt-[73px] h-screen overflow-hidden">
        <div
          ref={mapRef}
          className="relative w-full h-full bg-[#0a0a0f] cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <div
            className="absolute inset-0 transition-transform duration-100"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
              width: '200%',
              height: '200%',
              left: '-50%',
              top: '-50%'
            }}
          >
            {backgroundStars.map((star) => (
              <div
                key={star.id}
                className="absolute rounded-full star-twinkle"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  backgroundColor: '#cbd5e1',
                  opacity: star.opacity,
                  animationDelay: `${star.delay}s`
                }}
              />
            ))}

            {getFilteredObjects().map((obj) => (
              <div
                key={obj.id}
                className="absolute rounded-full cursor-pointer hover:scale-150 transition-all duration-200 group"
                style={{
                  left: `${obj.x}%`,
                  top: `${obj.y}%`,
                  width: `${getObjectSize(obj.brightness)}px`,
                  height: `${getObjectSize(obj.brightness)}px`,
                  backgroundColor: getObjectColor(obj),
                  boxShadow: `0 0 ${obj.brightness * 3}px ${getObjectColor(obj)}`,
                }}
                onClick={(e) => handleObjectClick(obj, e)}
                title={obj.name}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-card border border-border rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {obj.name}
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-4 flex gap-2 z-10">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPanOffset({ x: 0, y: 0 })}
            >
              <Icon name="Crosshair" size={16} className="mr-2" />
              Центрировать
            </Button>
          </div>

          <div className="absolute bottom-4 right-4 z-10">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground">
                  Отображено: <span className="font-semibold text-foreground">{getFilteredObjects().length}</span> объектов
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Dialog open={selectedObject !== null} onOpenChange={(open) => !open && setSelectedObject(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedObject && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex-shrink-0 float-animation"
                    style={{
                      backgroundColor: getObjectColor(selectedObject),
                      boxShadow: `0 0 20px ${getObjectColor(selectedObject)}`
                    }}
                  />
                  <div className="flex-1">
                    <DialogTitle className="text-2xl">{selectedObject.name}</DialogTitle>
                    <DialogDescription className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">
                        {selectedObject.type === 'star' ? '⭐ Звезда' :
                         selectedObject.type === 'planet' ? '🪐 Планета' :
                         selectedObject.type === 'nebula' ? '🌸 Туманность' :
                         selectedObject.type === 'galaxy' ? '🌌 Галактика' : '✨ Скопление'}
                      </Badge>
                      {selectedObject.constellation && (
                        <Badge variant="secondary">{selectedObject.constellation}</Badge>
                      )}
                      {selectedObject.magnitude && (
                        <Badge variant="outline">Звёздная величина: {selectedObject.magnitude}</Badge>
                      )}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="FileText" size={18} />
                    Описание
                  </h3>
                  <p className="text-muted-foreground">{selectedObject.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Icon name="Ruler" size={16} />
                        Расстояние
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-semibold">{selectedObject.distance}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Icon name="Sparkle" size={16} />
                        Яркость
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-semibold">{selectedObject.brightness.toFixed(1)}/6.0</p>
                    </CardContent>
                  </Card>
                </div>

                {selectedObject.facts && selectedObject.facts.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Lightbulb" size={18} />
                      Интересные факты
                    </h3>
                    <ul className="space-y-2">
                      {selectedObject.facts.map((fact, index) => (
                        <li key={index} className="flex gap-3 text-sm text-muted-foreground">
                          <Icon name="ChevronRight" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
