const menuToggle = document.querySelector('.menu_toggle');
const contentAside = document.querySelector('.content_aside');

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login_form');
const emailInput = document.querySelector('.login_email');
const passwordInput = document.querySelector('.login_password');
const loginSignup = document.querySelector('.login_signup'); 
const sidebarMenuElement = document.querySelector('.sidebar_menu');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user_name');
const userAvatarImg = document.querySelector('.user_avatar');

const userExitButton = document.querySelector('.user_exit');
const editButton = document.querySelector('.edit');
const formEditElem = document.querySelector('.form_edit');
const editUsernameInput = document.querySelector('.edit_username');
const editUserPhotoInput = document.querySelector('.edit_photo');

const contentMainPosts = document.querySelector('.content_main');

const buttonNewPost = document.querySelector('.button_public');
const newPostElem = document.querySelector('.new_post');

const regExpEmail = /^\w+@\w+\.\w{2,}$/;

menuToggle.addEventListener('click', (event) => {
    event.preventDefault();
    contentAside.classList.toggle('visible');
});

let userList = [
    {
        id: '01',
        email: 'anzor.shadzhe@gmail.com',
        password: 's4649062s',
        userName: 'anzor1',
        url: 'https://img3.fonwall.ru/o/do/nature-sand-sky-sun-light.jpeg?route=mid&h=750'
    },
    {
        id: '02',
        email: 'quantum_14@yandex.ru',
        password: 's4649062',
        userName: 'anzor2',
        url: 'https://img3.fonwall.ru/o/vd/wallpaper-cat-fluffy-close-cats.jpeg?route=mid&h=750'
    }
];

let setPost = {
  allPost:  [
    {
      title: 'Заголовок поста с интригой',
      text: 'Таким образом укрепление и развитие структуры требуют от нас анализа форм развития. Не следует, однако забывать, что реализация намеченных плановых заданий требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач. Задача организации, в особенности же консультация с широким активом способствует подготовки и реализации новых предложений. Равным образом новая модель организационной деятельности позволяет оценить значение модели развития.',
      tags: ['#Свежее#Горячее#Моё#Случайность'],
      like: 15,
      comments: 54,
      author: 'Jony',
      date: '11.11.2022, 16:23',
      photo: 'https://img3.fonwall.ru/o/eu/puppy-dog-mammal-vertebrate-oycl.jpeg?route=mid&h=750'
    },
    {
      title: 'Заголовок поста с печенкой',
      text: 'Таким образом укрепление и развитие структуры требуют от нас анализа форм развития. Не следует, однако забывать, что реализация намеченных плановых заданий требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач. Задача организации, в особенности же консультация с широким активом способствует подготовки и реализации новых предложений. Равным образом новая модель организационной деятельности позволяет оценить значение модели развития.',
      tags: ['#Свежее#Горячее#Моё#Случайность'],
      like: 154,
      comments: 5,
      author: 'Anton12',
      date: '12.11.2022, 10:23',
      photo: 'https://img3.fonwall.ru/o/jh/cyborg-artwork-artist-abstraction.jpeg?route=mid&h=750'
    }
  ],

  addPost(title, text, tags, handler, showPost) {
    let post = {
      title: title,
      text: text,
      tags: tags,
      like: 0,
      comments: 0,
      author: setUsers.user.userName,
      date: new Date().toLocaleString(),
      photo: setUsers.user.url
    }

    this.allPost.unshift(post);
    showPost();
    handler();

    console.log(this.allPost);
  }
};

let setUsers = {
    user: null,

    logIn (email, password, handler) {
       let user = this.getUser(email);
       
       if (user && user.password === password) {
        this.authorizadeUser(user);
        userAvatarImg.src = user.url;
        handler();
       } else {
        alert("Такой пользователь не найден");
       };
    },

    logOut () {
      this.user = null;
    },

    signUp (email, password, handler) {
      if (!regExpEmail.test(email)) {
        alert('Почта написана некорректно')
        return;
      };

      if (!this.getUser(email))  {
        if (!email.trim() || !password.trim()) {
          alert('Введены некоректные данные');
          return;
        };

        user = {email, password, userName: email.substring(email.indexOf('@'), 0), url: ''};
        userList.push(user);
        this.authorizadeUser(user);
        userAvatarImg.src = user.url;
        handler();
      } else {
        alert('такой пользователь уже зарегистрирован');
      };
    },

    getUser (email) {
      let user = null;

      for (let i = 0; i < userList.length; i++) {
        if (userList[i].email === email) {
            user = userList[i];
            break;
        };
      };

      return user;
    },

    authorizadeUser (user) {
        this.user = user;
    }
};

let toggleAuthDom = () => {
   let user = setUsers.user;

   if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.userName;
    buttonNewPost.style.display = 'flex';
    sidebarMenuElement.classList.add('visible');
    //
    contentMainPosts.style.display = '';
    newPostElem.classList.remove('visible');
   } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.style.display = 'none';
    sidebarMenuElement.classList.remove('visible');
    //
    contentMainPosts.style.display = '';
    newPostElem.classList.remove('visible');
   }
};

loginForm.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
});

loginSignup.addEventListener('click', event => {
    event.preventDefault();
    setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
});

userExitButton.addEventListener('click', event => {
  event.preventDefault();
  setUsers.logOut();
  toggleAuthDom();
});

editButton.addEventListener('click', event => {
  event.preventDefault();
  formEditElem.classList.toggle('visible');
  editUsernameInput.value = setUsers.user.userName;
});

let editProfile = (text, url) => {
  userNameElem.textContent = text;
  userAvatarImg.src = url || userAvatarImg.src;
  formEditElem.classList.remove('visible');
};

formEditElem.addEventListener('submit', event => {
  event.preventDefault();
  editProfile(editUsernameInput.value, editUserPhotoInput.value);
});

let showPost = () => {
  let postsHTML = '' ;

  setPost.allPost.forEach((elem) => {

    postsHTML += `
    <section class="first_post">
                <h2 class="heading_text">${elem.title}</h2>
                <p class="paragraph_text">${elem.text}</p>
                <div class="tags">
                    <span class="tag">${elem.tags}</span>
                </div>
                <div class="post_footer">
                    <div class="post_button">
                        <button class="button_likes button_q">
                            <svg width = "19px" height = "19px" class="icon">
                                <use xlink:href="img/icons.svg#likes"></use>
                              </svg>
                            <span class="likes_counter">${elem.like}</span>
                        </button>
                        <button class="button_comments button_q">
                            <svg width = "21px" height = "21px" class="icon">
                                <use xlink:href="img/icons.svg#comments"></use>
                              </svg>
                            <span class="comments_counter">${elem.comments}</span>
                        </button>
                        <button class="button_save button_q">
                            <svg width = "19px" height = "19px" class="icon">
                                <use xlink:href="img/icons.svg#save"></use>
                              </svg>
                        </button>
                        <button class="button_share button_q">
                            <svg width = "17px" height = "18px" class="icon">
                                <use xlink:href="img/icons.svg#share"></use>
                              </svg>
                        </button>
                    </div>
                    <div class="post_author">
                        <div class="author_about">
                            <a href="#" class="author_name">${elem.author}</a>
                            <span class="text_time">${elem.date}</span>
                        </div>
                        <a href="#" class="author_link"><img src= ${elem.photo || "img/avatar.jpg"} alt="" class="author_img"></a>
                    </div>
                </div>
            </section>
    `
  });

  contentMainPosts.innerHTML = postsHTML;
};

buttonNewPost.addEventListener('click', event => {
  event.preventDefault();
  contentMainPosts.style.display = 'none';
  newPostElem.classList.add('visible');
});

newPostElem.addEventListener('submit', event => {
  event.preventDefault();
  const {title, text, tags} = newPostElem.elements;

  if (title.value.length < 10 || text.value.length < 20 || tags.value.length < 5) {
    alert('Введено недостаточное количество символов');
    return;
  };

  if (tags.value.indexOf('#') == -1) {
    alert('В начаде тегом должна стоять - "#"');
    return;
  };

  setPost.addPost(title.value, text.value, tags.value, toggleAuthDom, showPost);
  newPostElem.reset();  
});

showPost();
toggleAuthDom();

