import doko from './doko.jpg';
import art from './art.jpg';
import khukuri from './khukuri.jpg';
import logo from './logo.png';
import photo from './photo.jpg';
import search_icon from './search-icon.jpg';
import profile_icon from './profile-icon.jpg';
import cart_icon from './cart-icon.jpg';

import dhaka_topi from './dhaka_topi.png';
import banner from './banner.jpg';
import jewelry from './jewelry.jpg';
import sculpture from './sculpture.jpg';
import textiles from './textiles.jpg';
import utensils from './utensils.jpg';
import decor from './decor.jpg';

import dhaka_topi from './dhaka_topi.png';  // New import
import murti from './Murti.jpg'


export const assets = {
  logo,
  doko,
  art,
  khukuri,
  photo,
  search_icon,
  profile_icon,
  cart_icon,

  banner,
  dhaka_topi,
  jewelry,
  sculpture,
  textiles,
  utensils,
  decor,
  dhaka_topi,  // New asset
  murti

};


export const products = [
  {
    _id: 'aaaa',
    name: 'Nepali Doko',
    shortDescription: 'A traditional bamboo basket from Nepal.',
    description: 'This is doko usually used to carry things',
    details: 'A sturdy bamboo basket crafted by local artisans in Nepal, ideal for carrying goods.',
    origin: 'Nepal',
    materials: 'Bamboo, Twine',
    price: '1500',
    Image: [doko],
    category: 'Handmade',
    date: 12345678,
    bestseller: true
  },
  {
    _id: 'bbbb',
    name: 'Art',
    shortDescription: 'Beautiful artwork inspired by Nepalese culture.',
    description: 'This is a beautiful piece of art.',
    details: 'Hand-painted artwork inspired by Nepali culture and landscapes.',
    origin: 'Nepal',
    materials: 'Canvas, Paint',
    price: '2000',
    Image: [art],
    category: 'Art',
    date: 12345678,
    bestseller: false
  },
  {
    _id: 'cccc',
    name: 'Khukuri',
    shortDescription: 'Traditional Nepali Khukuri knife.',
    description: 'This is a traditional Khukuri knife.',
    details: 'A handcrafted blade used by the Nepali army and people for centuries.',
    origin: 'Nepal',
    materials: 'Steel, Wood',
    price: '1500',
    Image: [khukuri],
    category: 'Traditional',
    date: 12345678,
    bestseller: true
  },
  {
    _id: 'dddd',
    name: 'Photo',
    shortDescription: 'Stunning photography of Nepali culture.',
    description: 'A stunning photo of Nepali culture.',
    details: 'A professionally shot photograph capturing the essence of Nepal’s diverse heritage.',
    origin: 'Nepal',
    materials: 'Digital Print',
    price: '800',
    Image: [photo],
    category: 'Photography',
    date: 12345678,
    bestseller: false
  },
  {
    _id: 'eeee',
    name: 'Dhaka Topi',
    shortDescription: 'Traditional Nepali Dhaka hat.',
    description: 'Traditional Nepali hat, known as Dhaka Topi.',
    details: 'A handcrafted hat made with traditional Dhaka fabric, worn with pride in Nepal.',
    origin: 'Nepal',
    materials: 'Dhaka Fabric',
    price: '500',
    Image: [dhaka_topi],
    category: 'Fashion',
    date: 12345678,
    bestseller: true
  },
  {
    _id: 'ffff',
    name: 'Nepali Jewelry',
    shortDescription: 'Handmade jewelry inspired by Nepali tradition.',
    description: 'Beautiful handmade jewelry inspired by Nepali culture.',
    details: 'Elegant pieces created by local artisans, blending modern design with traditional Nepali craftsmanship.',
    origin: 'Nepal',
    materials: 'Gold, Silver, Precious Stones',
    price: '2500',
    Image: [jewelry],
    category: 'Jewelry',
    date: 12345678,
    bestseller: false
  },
  {
    _id: 'gggg',
    name: 'Nepali Sculpture',
    shortDescription: 'Traditional handcrafted sculpture.',
    description: 'Handcrafted sculpture representing Nepali tradition.',
    details: 'Exquisite sculptures that showcase the spiritual and cultural art of Nepal.',
    origin: 'Nepal',
    materials: 'Stone, Bronze',
    price: '3000',
    Image: [sculpture],
    category: 'Sculpture',
    date: 12345678,
    bestseller: true
  },
  {
    _id: 'hhhh',
    name: 'Handwoven Textiles',
    shortDescription: 'Authentic textiles handwoven in Nepal.',
    description: 'Authentic handwoven Nepali textiles.',
    details: 'Handwoven fabrics created using traditional techniques, popular for clothing and decor.',
    origin: 'Nepal',
    materials: 'Cotton, Silk, Wool',
    price: '1800',
    Image: [textiles],
    category: 'Textiles',
    date: 12345678,
    bestseller: false
  },
  {
    _id: 'iiii',
    name: 'Traditional Utensils',
    shortDescription: 'Traditional utensils from Nepal.',
    description: 'Utensils made using traditional Nepali methods.',
    details: 'Crafted using techniques passed down through generations, these utensils are both practical and cultural.',
    origin: 'Nepal',
    materials: 'Brass, Copper',
    price: '1200',
    Image: [utensils],
    category: 'Utensils',
    date: 12345678,
    bestseller: false
  },
  {
    _id: 'jjjj',
    name: 'Home Decor',
    shortDescription: 'Decor items to bring Nepali aesthetics to your home.',
    description: 'Beautiful decor items to bring Nepali aesthetics to your home.',
    details: 'Handcrafted decor items perfect for adding a unique Nepali touch to any space.',
    origin: 'Nepal',
    materials: 'Wood, Metal, Fabric',
    price: '2300',
    Image: [decor],
    category: 'Decor',
    date: 12345678,
    bestseller: true
  },
  {
    _id: 'hhhk',
    name: 'Handwoven Textiles',
    shortDescription: 'Authentic textiles handwoven in Nepal.',
    description: 'Authentic handwoven Nepali textiles.',
    details: 'Handwoven fabrics created using traditional techniques, popular for clothing and decor.',
    origin: 'Nepal',
    materials: 'Cotton, Silk, Wool',
    price: '1800',
    Image: [textiles],
    category: 'Textiles',
    date: 12345678,
    bestseller: false
  },
  {
    _id: 'iiik',
    name: 'Traditional Utensils',
    shortDescription: 'Traditional utensils from Nepal.',
    description: 'Utensils made using traditional Nepali methods.',
    details: 'Crafted using techniques passed down through generations, these utensils are both practical and cultural.',
    origin: 'Nepal',
    materials: 'Brass, Copper',
    price: '1200',
    Image: [utensils],
    category: 'Utensils',
    date: 12345678,
    bestseller: false
  },
  {
    _id: 'jjjk',
    name: 'Home Decor',
    shortDescription: 'Decor items to bring Nepali aesthetics to your home.',
    description: 'Beautiful decor items to bring Nepali aesthetics to your home.',
    details: 'Handcrafted decor items perfect for adding a unique Nepali touch to any space.',
    origin: 'Nepal',
    materials: 'Wood, Metal, Fabric',
    price: '2300',
    Image: [decor],
    category: 'Decor',
    date: 12345678,
    bestseller: true
  }  
];
