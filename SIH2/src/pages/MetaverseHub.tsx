import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Star, ArrowRight, Globe, ChevronDown } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Place {
  id: string;
  name: string;
  image: string;
  rating: number;
  visitors: string;
  description: string;
}

interface City {
  id: string;
  name: string;
  image: string;
  places: Place[];
}

interface Country {
  id: string;
  name: string;
  cities: City[];
}

const MetaverseHub = () => {
  const [hoveredPlace, setHoveredPlace] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const navigate = useNavigate();

  const countries: Country[] = [
    {
      id: 'france',
      name: 'France',
      cities: [
        {
          id: 'paris',
          name: 'Paris',
          image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
          places: [
            {
              id: 'eiffel-tower',
              name: 'Eiffel Tower',
              image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
              rating: 4.8,
              visitors: '2.1M',
              description: 'Iconic iron tower offering city views'
            },
            {
              id: 'louvre',
              name: 'Louvre Museum',
              image: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg',
              rating: 4.7,
              visitors: '1.8M',
              description: 'World\'s largest art museum'
            },
            {
              id: 'notre-dame',
              name: 'Notre-Dame Cathedral',
              image: 'https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg',
              rating: 4.7,
              visitors: '1.1M',
              description: 'Medieval Catholic cathedral on the Île de la Cité'
            }
          ]
        },
        {
          id: 'nice',
          name: 'Nice',
          image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
          places: [
            {
              id: 'promenade-des-anglais',
              name: 'Promenade des Anglais',
              image: 'https://images.pexels.com/photos/248771/pexels-photo-248771.jpeg',
              rating: 4.6,
              visitors: '800k',
              description: 'Seafront boulevard along the Mediterranean'
            },
            {
              id: 'old-town-nice',
              name: 'Old Town',
              image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
              rating: 4.5,
              visitors: '650k',
              description: 'Colorful narrow streets and markets'
            }
          ]
        }
      ]
    },
    {
      id: 'japan',
      name: 'Japan',
      cities: [
        {
          id: 'tokyo',
          name: 'Tokyo',
          image: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg',
          places: [
            {
              id: 'shibuya',
              name: 'Shibuya Crossing',
              image: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg',
              rating: 4.9,
              visitors: '1.5M',
              description: 'World\'s busiest pedestrian crossing'
            },
            {
              id: 'sensoji',
              name: 'Senso-ji Temple',
              image: 'https://images.pexels.com/photos/2609314/pexels-photo-2609314.jpeg',
              rating: 4.8,
              visitors: '1.2M',
              description: 'Ancient Buddhist temple in Asakusa'
            },
            {
              id: 'tokyo-skytree',
              name: 'Tokyo Skytree',
              image: 'https://images.pexels.com/photos/1319839/pexels-photo-1319839.jpeg',
              rating: 4.8,
              visitors: '1.7M',
              description: 'Broadcasting and observation tower'
            }
          ]
        },
        {
          id: 'kyoto',
          name: 'Kyoto',
          image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
          places: [
            {
              id: 'fushimi-inari',
              name: 'Fushimi Inari Shrine',
              image: 'https://images.pexels.com/photos/462146/pexels-photo-462146.jpeg',
              rating: 4.9,
              visitors: '1.3M',
              description: 'Thousand torii gates path'
            },
            {
              id: 'kinkaku-ji',
              name: 'Kinkaku-ji (Golden Pavilion)',
              image: 'https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg',
              rating: 4.8,
              visitors: '1.1M',
              description: 'Zen Buddhist temple covered in gold leaf'
            }
          ]
        }
      ]
    },
    {
      id: 'usa',
      name: 'USA',
      cities: [
        {
          id: 'new-york',
          name: 'New York',
          image: 'https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg',
          places: [
            {
              id: 'statue-of-liberty',
              name: 'Statue of Liberty',
              image: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg',
              rating: 4.9,
              visitors: '4.5M',
              description: 'Iconic symbol of freedom'
            },
            {
              id: 'central-park',
              name: 'Central Park',
              image: 'https://images.pexels.com/photos/450597/pexels-photo-450597.jpeg',
              rating: 4.8,
              visitors: '3.8M',
              description: 'Vast urban park in Manhattan'
            },
            {
              id: 'times-square',
              name: 'Times Square',
              image: 'https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg',
              rating: 4.6,
              visitors: '5.0M',
              description: 'Neon-lit commercial and entertainment hub'
            }
          ]
        },
        {
          id: 'san-francisco',
          name: 'San Francisco',
          image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg',
          places: [
            {
              id: 'golden-gate-bridge',
              name: 'Golden Gate Bridge',
              image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg',
              rating: 4.8,
              visitors: '2.7M',
              description: 'Iconic suspension bridge in San Francisco'
            },
            {
              id: 'alcatraz',
              name: 'Alcatraz Island',
              image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg',
              rating: 4.5,
              visitors: '900k',
              description: 'Historic island prison and museum'
            }
          ]
        }
      ]
    },
    {
      id: 'uk',
      name: 'UK',
      cities: [
        {
          id: 'london',
          name: 'London',
          image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
          places: [
            {
              id: 'tower-bridge',
              name: 'Tower Bridge',
              image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
              rating: 4.6,
              visitors: '1.9M',
              description: 'Victorian-era bascule and suspension bridge'
            },
            {
              id: 'buckingham',
              name: 'Buckingham Palace',
              image: 'https://images.pexels.com/photos/1118408/pexels-photo-1118408.jpeg',
              rating: 4.7,
              visitors: '1.4M',
              description: 'Royal residence in London'
            },
            {
              id: 'big-ben',
              name: 'Big Ben',
              image: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg',
              rating: 4.7,
              visitors: '1.6M',
              description: 'Iconic clock tower at the Houses of Parliament'
            }
          ]
        },
        {
          id: 'edinburgh',
          name: 'Edinburgh',
          image: 'https://images.pexels.com/photos/284457/pexels-photo-284457.jpeg',
          places: [
            {
              id: 'edinburgh-castle',
              name: 'Edinburgh Castle',
              image: 'https://images.pexels.com/photos/284457/pexels-photo-284457.jpeg',
              rating: 4.6,
              visitors: '1.2M',
              description: 'Historic fortress dominating the skyline'
            },
            {
              id: 'royal-mile',
              name: 'Royal Mile',
              image: 'https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg',
              rating: 4.4,
              visitors: '700k',
              description: 'Main thoroughfare of the Old Town'
            }
          ]
        }
      ]
    },
    {
      id: 'uae',
      name: 'UAE',
      cities: [
        {
          id: 'dubai',
          name: 'Dubai',
          image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg',
          places: [
            {
              id: 'burj-khalifa',
              name: 'Burj Khalifa',
              image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg',
              rating: 4.8,
              visitors: '1.6M',
              description: 'Tallest building with observation decks'
            },
            {
              id: 'palm-jumeirah',
              name: 'Palm Jumeirah',
              image: 'https://images.pexels.com/photos/325193/pexels-photo-325193.jpeg',
              rating: 4.7,
              visitors: '1.3M',
              description: 'Man-made palm-shaped island'
            },
            {
              id: 'dubai-mall',
              name: 'Dubai Mall',
              image: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg',
              rating: 4.6,
              visitors: '2.0M',
              description: 'One of the world\'s largest shopping malls'
            }
          ]
        },
        {
          id: 'abu-dhabi',
          name: 'Abu Dhabi',
          image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg',
          places: [
            {
              id: 'sheikh-zayed-mosque',
              name: 'Sheikh Zayed Grand Mosque',
              image: 'https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg',
              rating: 4.9,
              visitors: '1.1M',
              description: 'Grand mosque with 82 domes and exquisite marble work'
            },
            {
              id: 'louvre-abu-dhabi',
              name: 'Louvre Abu Dhabi',
              image: 'https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg',
              rating: 4.7,
              visitors: '600k',
              description: 'Art museum with a stunning floating dome'
            }
          ]
        }
      ]
    },
    {
      id: 'spain',
      name: 'Spain',
      cities: [
        {
          id: 'barcelona',
          name: 'Barcelona',
          image: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg',
          places: [
            {
              id: 'sagrada-familia',
              name: 'Sagrada Familia',
              image: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg',
              rating: 4.7,
              visitors: '1.4M',
              description: 'Gaudí\'s masterpiece basilica'
            },
            {
              id: 'park-guell',
              name: 'Park Güell',
              image: 'https://images.pexels.com/photos/586570/pexels-photo-586570.jpeg',
              rating: 4.6,
              visitors: '1.1M',
              description: 'Colorful public park with mosaic art'
            },
            {
              id: 'la-rambla',
              name: 'La Rambla',
              image: 'https://images.pexels.com/photos/91224/pexels-photo-91224.jpeg',
              rating: 4.4,
              visitors: '1.9M',
              description: 'Famous tree-lined pedestrian street'
            }
          ]
        },
        {
          id: 'madrid',
          name: 'Madrid',
          image: 'https://images.pexels.com/photos/257463/pexels-photo-257463.jpeg',
          places: [
            {
              id: 'royal-palace-madrid',
              name: 'Royal Palace of Madrid',
              image: 'https://images.pexels.com/photos/257463/pexels-photo-257463.jpeg',
              rating: 4.6,
              visitors: '1.0M',
              description: 'Official residence of the Spanish royal family'
            },
            {
              id: 'retiro-park',
              name: 'El Retiro Park',
              image: 'https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg',
              rating: 4.5,
              visitors: '900k',
              description: 'Historic park with a lake and monuments'
            }
          ]
        }
      ]
    }
    ,
    {
      id: 'india',
      name: 'India',
      cities: [
        {
          id: 'sikkim',
          name: 'Sikkim',
          image: 'https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg',
          places: [
            {
              id: 'mg-marg',
              name: 'MG Marg',
              image: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg',
              rating: 4.6,
              visitors: '900k',
              description: 'Pedestrian-only shopping street in Gangtok'
            },
            {
              id: 'rumtek-monastery',
              name: 'Rumtek Monastery',
              image: 'https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg',
              rating: 4.8,
              visitors: '1.1M',
              description: 'One of the largest and most famous monasteries in Sikkim'
            },
            {
              id: 'tsomgo-lake',
              name: 'Tsomgo (Changu) Lake',
              image: 'https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg',
              rating: 4.7,
              visitors: '1.3M',
              description: 'Scenic glacial lake surrounded by mountains'
            }
          ]
        },
        {
          id: 'jharkhand',
          name: 'Jharkhand',
          image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
          places: [
            {
              id: 'hundru-falls',
              name: 'Hundru Falls',
              image: 'https://images.pexels.com/photos/60597/waterfall-falls-nature-forest-60597.jpeg',
              rating: 4.6,
              visitors: '750k',
              description: 'Spectacular waterfall near Ranchi on the Subarnarekha River'
            },
            {
              id: 'patratu-valley',
              name: 'Patratu Valley',
              image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
              rating: 4.5,
              visitors: '680k',
              description: 'Winding roads with lush green hills and viewpoints'
            },
            {
              id: 'jagannath-temple-ranchi',
              name: 'Jagannath Temple, Ranchi',
              image: 'https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg',
              rating: 4.4,
              visitors: '540k',
              description: 'Historic 17th-century temple with panoramic city views'
            }
          ]
        },
        {
          id: 'hyderabad',
          name: 'Hyderabad',
          image: 'https://images.pexels.com/photos/14059328/pexels-photo-14059328.jpeg',
          places: [
            {
              id: 'charminar',
              name: 'Charminar',
              image: 'https://images.pexels.com/photos/14059328/pexels-photo-14059328.jpeg',
              rating: 4.7,
              visitors: '2.0M',
              description: 'Iconic 16th-century mosque with four grand arches'
            },
            {
              id: 'golconda-fort',
              name: 'Golconda Fort',
              image: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg',
              rating: 4.6,
              visitors: '1.4M',
              description: 'Historic fortress known for its acoustics and views'
            }
          ]
        },
        {
          id: 'mumbai',
          name: 'Mumbai',
          image: 'https://images.pexels.com/photos/1796726/pexels-photo-1796726.jpeg',
          places: [
            {
              id: 'gateway-of-india',
              name: 'Gateway of India',
              image: 'https://images.pexels.com/photos/1796726/pexels-photo-1796726.jpeg',
              rating: 4.7,
              visitors: '3.1M',
              description: 'Triumphal arch monument overlooking the Arabian Sea'
            },
            {
              id: 'marine-drive',
              name: 'Marine Drive',
              image: 'https://images.pexels.com/photos/459284/pexels-photo-459284.jpeg',
              rating: 4.6,
              visitors: '2.8M',
              description: 'C-shaped boulevard along the coast, famed for sunsets'
            }
          ]
        },
        {
          id: 'kolkata',
          name: 'Kolkata',
          image: 'https://images.pexels.com/photos/460744/pexels-photo-460744.jpeg',
          places: [
            {
              id: 'victoria-memorial',
              name: 'Victoria Memorial',
              image: 'https://images.pexels.com/photos/460744/pexels-photo-460744.jpeg',
              rating: 4.7,
              visitors: '1.9M',
              description: 'Marble museum and gardens commemorating Queen Victoria'
            },
            {
              id: 'howrah-bridge',
              name: 'Howrah Bridge',
              image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg',
              rating: 4.6,
              visitors: '2.2M',
              description: 'Cantilever bridge spanning the Hooghly River'
            }
          ]
        },
        {
          id: 'chennai',
          name: 'Chennai',
          image: 'https://images.pexels.com/photos/210196/pexels-photo-210196.jpeg',
          places: [
            {
              id: 'marina-beach',
              name: 'Marina Beach',
              image: 'https://images.pexels.com/photos/210196/pexels-photo-210196.jpeg',
              rating: 4.5,
              visitors: '3.0M',
              description: 'One of the longest urban beaches in the world'
            },
            {
              id: 'kapaleeshwarar-temple',
              name: 'Kapaleeshwarar Temple',
              image: 'https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg',
              rating: 4.7,
              visitors: '1.6M',
              description: 'Colorful Dravidian-style Hindu temple in Mylapore'
            }
          ]
        },
        {
          id: 'delhi',
          name: 'Delhi',
          image: 'https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg',
          places: [
            {
              id: 'india-gate',
              name: 'India Gate',
              image: 'https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg',
              rating: 4.6,
              visitors: '3.2M',
              description: 'War memorial and popular promenade in New Delhi'
            },
            {
              id: 'qutub-minar',
              name: 'Qutub Minar',
              image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg',
              rating: 4.7,
              visitors: '2.0M',
              description: 'UNESCO World Heritage Site and towering minaret'
            }
          ]
        },
        {
          id: 'bangalore',
          name: 'Bangalore',
          image: 'https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg',
          places: [
            {
              id: 'lalbagh',
              name: 'Lalbagh Botanical Garden',
              image: 'https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg',
              rating: 4.6,
              visitors: '1.5M',
              description: 'Historic botanical garden with glasshouse and rare plants'
            },
            {
              id: 'bangalore-palace',
              name: 'Bangalore Palace',
              image: 'https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg',
              rating: 4.5,
              visitors: '900k',
              description: 'Grand palace inspired by Tudor-style architecture'
            }
          ]
        },
        {
          id: 'vizag',
          name: 'Vizag',
          image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
          places: [
            {
              id: 'vizag-street',
              name: 'Ramakrishna Beach',
              image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
              rating: 4.5,
              visitors: '1.2M',
              description: 'Popular beach with scenic promenade in Visakhapatnam'
            },
            {
              id: 'kailasagiri',
              name: 'Kailasagiri',
              image: 'https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg',
              rating: 4.6,
              visitors: '800k',
              description: 'Hilltop park with panoramic city and sea views'
            }
          ]
        }
      ]
    }
  ];

  useEffect(() => {
    if (countries.length > 0) {
      setSelectedCountry(countries[0]);
    }
    // Close dropdowns on outside click
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#country-dropdown') && !target.closest('#country-button')) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsCountryOpen(false);
  };

  type PlaceWithCity = Place & { cityName: string };
  const placesInSelectedCountry: PlaceWithCity[] = selectedCountry
    ? selectedCountry.cities.flatMap((city) => city.places.map((p) => ({ ...p, cityName: city.name })))
    : [];

  const handlePlaceClick = (placeId: string) => {
    navigate(`/preview/${placeId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Explore the
            <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Metaverse
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Step into immersive 3D worlds and explore destinations before you travel. 
            Experience 360° virtual tours and discover hidden gems.
          </p>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full">
              <Globe className="h-5 w-5" />
              <span className="font-medium">VR Compatible • 4K Quality • Real-time Exploration</span>
            </div>
            
            <motion.button
              onClick={() => navigate('/plan-trip')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Plan My Trip
            </motion.button>
          </div>
        </motion.div>

        {/* Country Selector */}
        <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center md:space-x-4 space-y-4 md:space-y-0">
          {/* Country Selector */}
          <div className="relative w-full md:w-1/3">
            <button
              id="country-button"
              onClick={() => setIsCountryOpen((v) => !v)}
              className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:shadow focus:outline-none"
            >
              <div className="text-left">
                <div className="text-xs text-gray-500">Country</div>
                <div className="text-gray-900 font-semibold">{selectedCountry?.name ?? 'Select Country'}</div>
              </div>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </button>
            <AnimatePresence>
              {isCountryOpen && (
                <motion.div
                  id="country-dropdown"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                >
                  {countries.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleCountrySelect(c)}
                      className={`w-full text-left px-4 py-3 hover:bg-blue-50 ${selectedCountry?.id === c.id ? 'bg-blue-50' : ''}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Places Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {placesInSelectedCountry.map((place: PlaceWithCity, index: number) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredPlace(place.id)}
              onHoverEnd={() => setHoveredPlace(null)}
              onClick={() => handlePlaceClick(place.id)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Place Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* 3D Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                    3D View
                  </div>
                </div>

                {/* Place Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-2xl font-bold">{place.name}</h3>
                      <p className="text-blue-200">{place.cityName}, {selectedCountry?.name}</p>
                    </div>
                    <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{place.rating}</span>
                    </div>
                  </div>

                  <p className="text-blue-100 text-sm mb-3">{place.description}</p>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{place.visitors}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{place.cityName}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredPlace === place.id ? 1 : 0 }}
                  className="absolute inset-0 bg-blue-600/80 flex items-center justify-center"
                >
                  <div className="text-center text-white">
                    <Globe className="h-16 w-16 mx-auto mb-4" />
                    <p className="text-lg font-semibold mb-2">Enter 3D World</p>
                    <div className="flex items-center justify-center space-x-2">
                      <span>Explore Now</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Next-Generation Travel Experience
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Our metaverse technology provides photorealistic environments, 
            interactive hotspots, and real-time information to enhance your travel planning.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">360°</div>
              <div className="text-sm text-blue-100">Virtual Tours</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">4K</div>
              <div className="text-sm text-blue-100">Ultra HD Quality</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">Live</div>
              <div className="text-sm text-blue-100">Real-time Updates</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MetaverseHub;