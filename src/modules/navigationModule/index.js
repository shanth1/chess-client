import { Component } from '@/base';
import style from './style.module.css';
import router from '@/app/router';

const createLink = (text, path) => {
  const link = document.createElement('a');
  link.innerText = text;
  link.href = path;
  link.classList.add(style.link);
  link.onclick = (event) => {
    event.preventDefault();
    router.navigate(path);
  };

  router.updateActiveClass((locationHash) => {
    if (locationHash === path) {
      link.classList.add(style.active);
    } else {
      link.classList.remove(style.active);
    }
  });

  return link;
};

export default () => {
  const navigation = new Component('nav').element;

  navigation.classList.add(style.navigation);

  navigation.appendChild(createLink('Home', '#'));
  navigation.appendChild(createLink('About', '#about'));

  return navigation;
};
