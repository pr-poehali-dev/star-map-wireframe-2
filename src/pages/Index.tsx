import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Star {
  id: number;
  name: string;
  x: number;
  y: number;
  brightness: number;
  type: 'star' | 'planet' | 'nebula' | 'galaxy';
  constellation?: string;
  season?: string;
  description?: string;
}

interface Constellation {
  name: string;
  stars: number;
  season: string;
  description: string;
  mainStars: string[];
}

const constellations: Constellation[] = [
  {
    name: 'Большая Медведица',
    stars: 7,
    season: 'Весь год',
    description: 'Одно из самых узнаваемых созвездий северного полушария. Содержит знаменитый астеризм "Большой Ковш".',
    mainStars: ['Дубхе', 'Мерак', 'Фекда', 'Мегрец', 'Алиот', 'Мицар', 'Бенетнаш']
  },
  {
    name: 'Орион',
    stars: 7,
    season: 'Зима',
    description: 'Яркое экваториальное созвездие, известное поясом Ориона из трёх звёзд и туманностью Ориона.',
    mainStars: ['Бетельгейзе', 'Ригель', 'Беллатрикс', 'Альнилам', 'Минтака']
  },
  {
    name: 'Кассиопея',
    stars: 5,
    season: 'Осень',
    description: 'Созвездие в форме буквы "W", названное в честь мифической царицы Эфиопии.',
    mainStars: ['Шедар', 'Каф', 'Нави', 'Рукбах', 'Сегин']
  },
  {
    name: 'Лебедь',
    stars: 5,
    season: 'Лето',
    description: 'Крестообразное созвездие, представляющее летящего лебедя. Содержит яркую звезду Денеб.',
    mainStars: ['Денеб', 'Альбирео', 'Садр', 'Гиенах']
  },
  {
    name: 'Лев',
    stars: 9,
    season: 'Весна',
    description: 'Зодиакальное созвездие, представляющее льва. Главная звезда — Регул.',
    mainStars: ['Регул', 'Денебола', 'Альгиеба', 'Зосма']
  },
  {
    name: 'Скорпион',
    stars: 18,
    season: 'Лето',
    description: 'Яркое зодиакальное созвездие с красной звездой Антарес в центре.',
    mainStars: ['Антарес', 'Шаула', 'Саргас', 'Акраб']
  }
];

const generateStars = (): Star[] => {
  const stars: Star[] = [];
  const starTypes: Array<'star' | 'planet' | 'nebula' | 'galaxy'> = ['star', 'planet', 'nebula', 'galaxy'];
  const seasons = ['Зима', 'Весна', 'Лето', 'Осень', 'Весь год'];
  const starNames = [
    'Сириус', 'Канопус', 'Арктур', 'Вега', 'Капелла', 'Ригель', 'Процион', 'Бетельгейзе',
    'Альтаир', 'Альдебаран', 'Антарес', 'Спика', 'Поллукс', 'Фомальгаут', 'Денеб',
    'Регул', 'Кастор', 'Шаула', 'Беллатрикс', 'Альнилам', 'Минтака', 'Дубхе', 'Алиот',
    'Мицар', 'Альбирео', 'Садр', 'Шедар', 'Каф', 'Нави'
  ];

  for (let i = 0; i < 150; i++) {
    const type = i < 25 ? starTypes[Math.floor(Math.random() * starTypes.length)] : 'star';
    stars.push({
      id: i,
      name: i < starNames.length ? starNames[i] : `Звезда-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      brightness: Math.random() * 5 + 1,
      type,
      constellation: i < 30 ? constellations[Math.floor(Math.random() * constellations.length)].name : undefined,
      season: seasons[Math.floor(Math.random() * seasons.length)],
      description: type !== 'star' ? `${type === 'planet' ? 'Планета' : type === 'nebula' ? 'Туманность' : 'Галактика'} в созвездии` : undefined
    });
  }
  return stars;
};

export default function Index() {
  const [stars] = useState<Star[]>(generateStars());
  const [filteredStars, setFilteredStars] = useState<Star[]>(stars);
  const [selectedStar, setSelectedStar] = useState<Star | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [brightnessFilter, setBrightnessFilter] = useState([1, 6]);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [seasonFilter, setSeasonFilter] = useState<string>('all');

  useEffect(() => {
    const filtered = stars.filter(star => {
      const matchesBrightness = star.brightness >= brightnessFilter[0] && star.brightness <= brightnessFilter[1];
      const matchesType = typeFilter === 'all' || star.type === typeFilter;
      const matchesSeason = seasonFilter === 'all' || star.season === seasonFilter;
      const matchesSearch = star.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (star.constellation?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      
      return matchesBrightness && matchesType && matchesSeason && matchesSearch;
    });
    setFilteredStars(filtered);
  }, [brightnessFilter, typeFilter, seasonFilter, searchQuery, stars]);

  const getStarColor = (star: Star) => {
    if (star.type === 'planet') return '#ffd43b';
    if (star.type === 'nebula') return '#ff6b9d';
    if (star.type === 'galaxy') return '#a5d8ff';
    if (star.brightness > 4) return '#ffffff';
    if (star.brightness > 3) return '#e0e7ff';
    return '#cbd5e1';
  };

  const getStarSize = (brightness: number) => {
    return brightness > 4 ? 4 : brightness > 3 ? 3 : 2;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Sparkles" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold">Звёздное небо</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-2">
              <Icon name="Eye" size={16} />
              {filteredStars.length} объектов
            </Badge>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <Tabs defaultValue="map" className="w-full">
          <div className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-[73px] z-40">
            <div className="container mx-auto px-4">
              <TabsList className="w-full justify-start h-14 bg-transparent">
                <TabsTrigger value="map" className="gap-2">
                  <Icon name="Map" size={18} />
                  Карта неба
                </TabsTrigger>
                <TabsTrigger value="catalog" className="gap-2">
                  <Icon name="BookOpen" size={18} />
                  Созвездия
                </TabsTrigger>
                <TabsTrigger value="search" className="gap-2">
                  <Icon name="Search" size={18} />
                  Поиск
                </TabsTrigger>
                <TabsTrigger value="legend" className="gap-2">
                  <Icon name="Info" size={18} />
                  Легенда
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="map" className="m-0 p-0">
            <div className="container mx-auto px-4 py-6">
              <div className="grid lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-1 h-fit">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="SlidersHorizontal" size={20} />
                      Фильтры
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Icon name="Sparkle" size={16} />
                        Яркость звёзд
                      </label>
                      <Slider
                        min={1}
                        max={6}
                        step={0.5}
                        value={brightnessFilter}
                        onValueChange={setBrightnessFilter}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{brightnessFilter[0].toFixed(1)}</span>
                        <span>{brightnessFilter[1].toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Icon name="Layers" size={16} />
                        Тип объекта
                      </label>
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все типы</SelectItem>
                          <SelectItem value="star">⭐ Звёзды</SelectItem>
                          <SelectItem value="planet">🪐 Планеты</SelectItem>
                          <SelectItem value="nebula">🌸 Туманности</SelectItem>
                          <SelectItem value="galaxy">🌌 Галактики</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Icon name="Calendar" size={16} />
                        Сезон видимости
                      </label>
                      <Select value={seasonFilter} onValueChange={setSeasonFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все сезоны</SelectItem>
                          <SelectItem value="Зима">❄️ Зима</SelectItem>
                          <SelectItem value="Весна">🌸 Весна</SelectItem>
                          <SelectItem value="Лето">☀️ Лето</SelectItem>
                          <SelectItem value="Осень">🍂 Осень</SelectItem>
                          <SelectItem value="Весь год">🌍 Весь год</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setBrightnessFilter([1, 6]);
                        setTypeFilter('all');
                        setSeasonFilter('all');
                        setSearchQuery('');
                      }}
                    >
                      <Icon name="RotateCcw" size={16} className="mr-2" />
                      Сбросить фильтры
                    </Button>
                  </CardContent>
                </Card>

                <div className="lg:col-span-3 space-y-4">
                  <Card className="relative overflow-hidden bg-gradient-to-b from-card to-background border-2 border-primary/20">
                    <div 
                      className="relative w-full aspect-[16/10] bg-[#0a0a0f] cursor-crosshair"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        const y = ((e.clientY - rect.top) / rect.height) * 100;
                        
                        const clickedStar = filteredStars.find(star => 
                          Math.abs(star.x - x) < 2 && Math.abs(star.y - y) < 2
                        );
                        
                        if (clickedStar) {
                          setSelectedStar(clickedStar);
                        }
                      }}
                    >
                      {filteredStars.map((star) => (
                        <div
                          key={star.id}
                          className="absolute rounded-full star-twinkle cursor-pointer hover:scale-150 transition-transform"
                          style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${getStarSize(star.brightness)}px`,
                            height: `${getStarSize(star.brightness)}px`,
                            backgroundColor: getStarColor(star),
                            boxShadow: `0 0 ${star.brightness * 2}px ${getStarColor(star)}`,
                            animationDelay: `${Math.random() * 3}s`,
                          }}
                          title={star.name}
                        />
                      ))}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
                    </div>
                  </Card>

                  {selectedStar && (
                    <Card className="animate-fade-in border-primary/50">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl">{selectedStar.name}</CardTitle>
                            <CardDescription className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="outline">
                                {selectedStar.type === 'star' ? '⭐ Звезда' : 
                                 selectedStar.type === 'planet' ? '🪐 Планета' : 
                                 selectedStar.type === 'nebula' ? '🌸 Туманность' : '🌌 Галактика'}
                              </Badge>
                              <Badge variant="secondary">
                                Яркость: {selectedStar.brightness.toFixed(1)}
                              </Badge>
                              {selectedStar.constellation && (
                                <Badge variant="outline">{selectedStar.constellation}</Badge>
                              )}
                              {selectedStar.season && (
                                <Badge variant="outline">{selectedStar.season}</Badge>
                              )}
                            </CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedStar(null)}
                          >
                            <Icon name="X" size={20} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {selectedStar.description || 'Небесный объект, видимый в ночном небе.'}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="catalog" className="m-0">
            <div className="container mx-auto px-4 py-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {constellations.map((constellation) => (
                  <Card key={constellation.name} className="hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Stars" size={20} className="text-primary" />
                        {constellation.name}
                      </CardTitle>
                      <CardDescription className="flex gap-2 mt-2">
                        <Badge variant="outline">{constellation.stars} звёзд</Badge>
                        <Badge variant="secondary">{constellation.season}</Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        {constellation.description}
                      </p>
                      <div>
                        <p className="text-xs font-medium mb-2">Главные звёзды:</p>
                        <div className="flex flex-wrap gap-1">
                          {constellation.mainStars.map((star) => (
                            <Badge key={star} variant="outline" className="text-xs">
                              {star}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="search" className="m-0">
            <div className="container mx-auto px-4 py-6">
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="relative">
                    <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Поиск звёзд, созвездий и объектов..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 text-lg"
                    />
                  </div>
                </CardContent>
              </Card>

              {searchQuery && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Найдено результатов: {filteredStars.length}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredStars.slice(0, 30).map((star) => (
                      <Card 
                        key={star.id} 
                        className="cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => setSelectedStar(star)}
                      >
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: getStarColor(star) }}
                            />
                            {star.name}
                          </CardTitle>
                          <CardDescription className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              {star.type === 'star' ? '⭐' : 
                               star.type === 'planet' ? '🪐' : 
                               star.type === 'nebula' ? '🌸' : '🌌'}
                            </Badge>
                            {star.constellation && (
                              <Badge variant="secondary" className="text-xs">
                                {star.constellation}
                              </Badge>
                            )}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="legend" className="m-0">
            <div className="container mx-auto px-4 py-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Palette" size={20} />
                      Обозначения объектов
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_8px_white]" />
                      <div>
                        <p className="font-medium">Яркие звёзды</p>
                        <p className="text-xs text-muted-foreground">Яркость {'>'} 4</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-slate-300" />
                      <div>
                        <p className="font-medium">Обычные звёзды</p>
                        <p className="text-xs text-muted-foreground">Яркость 1-4</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#ffd43b] shadow-[0_0_6px_#ffd43b]" />
                      <div>
                        <p className="font-medium">Планеты</p>
                        <p className="text-xs text-muted-foreground">Жёлтый цвет</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#ff6b9d] shadow-[0_0_6px_#ff6b9d]" />
                      <div>
                        <p className="font-medium">Туманности</p>
                        <p className="text-xs text-muted-foreground">Розовый цвет</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#a5d8ff] shadow-[0_0_6px_#a5d8ff]" />
                      <div>
                        <p className="font-medium">Галактики</p>
                        <p className="text-xs text-muted-foreground">Голубой цвет</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Lightbulb" size={20} />
                      Как пользоваться
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <Icon name="MousePointerClick" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Выбор объекта</p>
                        <p className="text-sm text-muted-foreground">Нажмите на звезду для просмотра информации</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Icon name="SlidersHorizontal" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Фильтрация</p>
                        <p className="text-sm text-muted-foreground">Используйте панель фильтров для настройки отображения</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Icon name="Search" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Поиск</p>
                        <p className="text-sm text-muted-foreground">Найдите нужный объект по названию или созвездию</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Icon name="BookOpen" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Каталог</p>
                        <p className="text-sm text-muted-foreground">Изучите описания созвездий и их главные звёзды</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Calendar" size={20} />
                      Сезоны видимости созвездий
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 font-medium">
                          <span>❄️</span>
                          <span>Зима</span>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>• Орион</p>
                          <p>• Телец</p>
                          <p>• Близнецы</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 font-medium">
                          <span>🌸</span>
                          <span>Весна</span>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>• Лев</p>
                          <p>• Дева</p>
                          <p>• Волопас</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 font-medium">
                          <span>☀️</span>
                          <span>Лето</span>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>• Лебедь</p>
                          <p>• Скорпион</p>
                          <p>• Стрелец</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 font-medium">
                          <span>🍂</span>
                          <span>Осень</span>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>• Кассиопея</p>
                          <p>• Пегас</p>
                          <p>• Андромеда</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
