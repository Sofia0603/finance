import {Login} from "./components/auth/login";
import {FileUtils} from "./utils/file-utils";
import {SignUp} from "./components/auth/sign-up";
import {Dashboard} from "./components/dashboard/dashboard";
import {Income} from "./components/income/income";
import {IncomeAdd} from "./components/income/IncomeAdd";
import {IncomeEdit} from "./components/income/incomeEdit";
import {Expenses} from "./components/expenses/expenses";
import {ExpensesAdd} from "./components/expenses/expensesAdd";
import {ExpensesEdit} from "./components/expenses/expensesEdit";
import {CommonPage} from "./components/common/common";
import {CommonAdd} from "./components/common/commonAdd";
import {CommonEdit} from "./components/common/commonEdit";
import {AuthUtils} from "./utils/auth-utils";
import {CheckAccessUtils} from "./utils/check-access-utils";
import {Logout} from "./components/auth/logout";


export class Router{
  constructor(){
    this.initEvents();

    this.titleMainElement = document.getElementById('title')
    this.titlePageElement = null;
    this.contentPageElement = document.getElementById('content');

    this.logoutButton = null;

    this.routes = [
      {
        route: '/',
        title:'Дашборд',
        titlePage: 'Главная',
        filePathTemplate:'/templates/pages/dashboard/dashboard.html',
        useLayout:'/templates/layout.html',
        load:() =>{
          new CheckAccessUtils(this.openNewRoute.bind(this))
          new Dashboard(this.openNewRoute.bind(this));
        },
        scripts:[
          "Chart.min.js",
          "adminlte.min.js"
        ],
        styles: [

        ]
      },
      {
        route: '/login',
        title:'Авторизация',
        filePathTemplate:'/templates/pages/auth/login.html',
        useLayout: false,
        load:() =>{
          new Login(this.openNewRoute.bind(this));
        },
        unload:() =>{},
      },
      {
        route: '/sign-up',
        title:'Регистрация',
        filePathTemplate:'/templates/pages/auth/signup.html',
        useLayout: false,
        load:() =>{
          new SignUp(this.openNewRoute.bind(this));
        },
        unload:() =>{},
      },
      {
        route: '/income',
        title:'Доходы',
        titlePage: 'Доходы',
        filePathTemplate:'/templates/pages/income/income.html',
        useLayout:'/templates/layout.html',
        load:() =>{
          new CheckAccessUtils(this.openNewRoute.bind(this))
          new Income(this.openNewRoute.bind(this));
        },
        unload:() =>{},
      },
      {
        route: '/income-add',
        title:'Доходы',
        titlePage: 'Создание категории доходов',
        filePathTemplate:'/templates/pages/income/income-add.html',
        useLayout:'/templates/layout.html',
        load:() =>{
          new CheckAccessUtils(this.openNewRoute.bind(this))
          new IncomeAdd(this.openNewRoute.bind(this));
        },
        unload:() =>{},
      },
      {
        route: '/income-edit',
        title:'Доходы',
        titlePage: 'Редактирование категории дохода',
        filePathTemplate:'/templates/pages/income/income-edit.html',
        useLayout:'/templates/layout.html',
        load:() =>{
          new CheckAccessUtils(this.openNewRoute.bind(this))
          new IncomeEdit(this.openNewRoute.bind(this));
        },
        unload:() =>{},
      },

      {
        route: '/expenses',
        title:'Расходы',
        titlePage: 'Расходы',
        filePathTemplate:'/templates/pages/expenses/expenses.html',
        useLayout:'/templates/layout.html',
        load:() =>{
          new CheckAccessUtils(this.openNewRoute.bind(this))
          new Expenses(this.openNewRoute.bind(this));
        },
        unload:() =>{},
      },

      {
        route: '/expenses-add',
        title:'Расходы',
        titlePage: 'Создание категории расходов',
        filePathTemplate:'/templates/pages/expenses/expenses-add.html',
        useLayout:'/templates/layout.html',
        load:() =>{
          new CheckAccessUtils(this.openNewRoute.bind(this))
          new ExpensesAdd(this.openNewRoute.bind(this));
        },
        unload:() =>{},
      },

      {
        route: '/expenses-edit',
        title:'Расходы',
        titlePage: 'Редактирование категории расходов',
        filePathTemplate:'/templates/pages/expenses/expenses-edit.html',
        useLayout:'/templates/layout.html',
        load:() =>{
          new CheckAccessUtils(this.openNewRoute.bind(this))
          new ExpensesEdit(this.openNewRoute.bind(this));
        },
        unload:() =>{},
      },

      {
        route: '/common',
        title:'Доходы и расходы',
        titlePage: 'Доходы и расходы',
        filePathTemplate:'/templates/pages/common/common.html',
        useLayout:'/templates/layout.html',
        load:() =>{
          new CheckAccessUtils(this.openNewRoute.bind(this))
          new CommonPage(this.openNewRoute.bind(this));
        },
        unload:() =>{},
      },
      {
        route: '/common-add',
        title:'Доходы и расходы',
        titlePage: 'Создать доход или расход',
        filePathTemplate:'/templates/pages/common/common-add.html',
        useLayout:'/templates/layout.html',
        load:() =>{
          new CheckAccessUtils(this.openNewRoute.bind(this))
          new CommonAdd(this.openNewRoute.bind(this));
        },
        unload:() =>{},
      },
      {
        route: '/common-edit',
        title:'Доходы и расходы',
        titlePage: 'Редактировать доход/расход',
        filePathTemplate:'/templates/pages/common/common-edit.html',
        useLayout:'/templates/layout.html',
        load:() =>{
          new CheckAccessUtils(this.openNewRoute.bind(this))
          new CommonEdit(this.openNewRoute.bind(this));
        },
        unload:() =>{},
      },
      {
        route: '/logout',
        load:() => {
          new Logout(this.openNewRoute.bind(this));
        }
      },

    ]
  }

  initEvents(){
    window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this)); // момент загрузки страницы
    window.addEventListener('popstate', this.activateRoute.bind(this)); // момент смены URL

    document.addEventListener('click', this.clickHandler.bind(this))

  }

  async openNewRoute(url){
    const currentRoute = window.location.pathname;
    history.pushState({}, '', url);
    await this.activateRoute(null, currentRoute);
  }

  async clickHandler(e){
    let element = null;
    if(e.target.nodeName === 'A'){
      element = e.target;
    } else if (e.target.parentNode.nodeName === 'A'){
      element = e.target.parentNode;
    }

    if(element){
      e.preventDefault();
      const currentRoute = window.location.pathname;

      const url = element.href.replace(window.location.origin, '');

      if (!url || (currentRoute === url.replace('#', ' ')) || url.startsWith('javascript:void(0)')){
        return;
      }

      await this.openNewRoute(url);

    }

  }

  async activateRoute(e, oldRoute = null){



    if(oldRoute){
      const currentRoute = this.routes.find(item => item.route === oldRoute);

      if(currentRoute.styles && currentRoute.styles.length > 0){
        currentRoute.styles.forEach(style => {
          document.querySelector(`link[href='/css/${style}']`).remove();
        })
      }

      if(currentRoute.scripts && currentRoute.scripts.length > 0){
        currentRoute.scripts.forEach(script => {
          document.querySelector(`script[src='/js/${script}']`).remove();
        })
      }


      if(currentRoute.unload && typeof currentRoute.unload === 'function'){
        currentRoute.unload();
      }
    }

    const urlRoute = window.location.pathname;
    const newRoute = this.routes.find(item => item.route === urlRoute);


    if (newRoute) {
      if(newRoute.styles && newRoute.styles.length > 0){

        newRoute.styles.forEach(style => {
          FileUtils.loadPageStyles('/css/' + style);
        })
      }

      if(newRoute.scripts && newRoute.scripts.length > 0){
        for (const script of newRoute.scripts){
          await FileUtils.loadPageScript('/js/' + script);
        }
      }


      if(newRoute.title){
        this.titleMainElement.innerText = newRoute.title + ' | Finance ';
      }

      if(newRoute.titlePageElement){
        this.titlePageElement.innerText = newRoute.titlePage;
      }

      if(newRoute.filePathTemplate){
        let contentBlock = this.contentPageElement;
        if(newRoute.useLayout) {
          console.log('layout')
          this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
          this.logoutButton = document.getElementById('logout-btn');
          contentBlock = document.getElementById('content-layout')

          this.titlePageElement = document.getElementById('title-page')
          this.titlePageElement.innerText = newRoute.titlePage;

          this.activateMenuItem(newRoute);
          this.userData = AuthUtils.getAuthInfo()

          if(this.userData.length !== 0){
            let userInfo = JSON.parse(this.userData.userInfo)

            if(userInfo){
                document.getElementById('full-name').innerText = userInfo.name + ' ' + userInfo.lastName;
              }
          }

          if(this.logoutButton){
            this.logoutButton.addEventListener('click', (e) => {
             this.openNewRoute('/logout');
            })
          }


        }
        contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
      }


      if(newRoute.load && typeof newRoute.load === 'function'){
        newRoute.load();
      }

    } else {
      history.pushState({}, '', '/404');
      await this.activateRoute();
    }

  }


  activateMenuItem(route){

    document.querySelectorAll('.common-sidebar .nav-link').forEach(item => {
      const href = item.getAttribute('href');

      const toggleItem = document.getElementById('toggle-btn')
      const dropdown = document.getElementById('dashboard-collapse')

      if(((route.route.includes('income') ) || (route.route.includes('expenses'))) && toggleItem ){
        toggleItem.setAttribute('aria-expanded', 'true');
        toggleItem.classList.remove('collapsed');
        dropdown.classList.add('show');
      } else {
        toggleItem.setAttribute('aria-expanded', "false");
        toggleItem.classList.add('collapsed');
        dropdown.classList.remove('show');
      }

      if((route.route.includes(href) && href !== '/') || (route.route === '/' && href === '/') ){
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    })
  }

}