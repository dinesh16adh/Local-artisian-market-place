import doko from './doko.jpg';
import art from './art.jpg';
import khukuri from './khukuri.jpg';
import logo from './logo.png';
import photo from './photo.jpg';
import search_icon from './search-icon.jpg';
import profile_icon from './profile-icon.jpg';
import cart_icon from './cart-icon.jpg';
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
  dhaka_topi,  // New asset
  murti
};


export const products = [
  {
    _id: 'aaaa',
    name: 'Nepali Doko',
    description: 'This is doko usually used to carry things',
    price: '1500',
    Image: [doko],
    category: 'Handmade',
    date: 12345678,
    bestseller: true
  },
  {
    _id: 'bbbb',
    name: 'Art',
    description: 'This is a beautiful piece of art.',
    price: '2000',
    Image: [art],
    category: 'Art',
    date: 12345678,
    bestseller: false
  },
  {
    _id: 'cccc',
    name: 'Khukuri',
    description: 'This is a traditional Khukuri knife.',
    price: '1500',
    Image: [khukuri],
    category: 'Handmade',
    date: 12345678,
    bestseller: true
  },
  {
    _id: 'dddd',
    name: 'Photo',
    description: 'A stunning photo of Nepali culture.',
    price: '800',
    Image: [photo],
    category: 'Photography',
    date: 12345678,
    bestseller: false
  },
  {
    _id: 'eeee',
    name: 'Dhaka Topi',
    description: 'Traditional Nepali hat, known as Dhaka Topi.',
    price: '500',
    Image: [dhaka_topi],
    category: 'Fashion',
    date: 12345678,
    bestseller: true
  }
  // Add more products here as needed
];