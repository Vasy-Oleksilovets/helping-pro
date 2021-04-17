import Home from './views/Home.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@trevoreyre/autocomplete-vue/dist/style.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-vue/dist/bootstrap-vue.min.js';

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      breadCrumb: 'Home'
    }
  },
  // Project
  {
    path: '/project',
    name: 'project.index',
    component: () => import('@/views/Project/Index.vue'),
    // If the user needs to be authenticated to view this page.
    meta: {
      auth: false,
    },
  },
  {
    path: '/newClientProject',
    name: 'newClientProject',
    component: () =>
      import('@/views/clients/projects/NewClientProject.vue'),
    // If the user needs to be authenticated to view this page.
    meta: {
      auth: false,
    },
  },
  // Report Show
  {
    path: '/report/:project_id',
    name: 'report.show',
    component: () => import('@/views/Report/Show.vue'),
    // component: () => import('@/views/clients/projects/ShowReport.vue'),
    // If the user needs to be authenticated to view this page.
    meta: {
      auth: false,
    },
  },
  // Template Index
  {
    path: '/template',
    name: 'template.index',
    component: () => import('@/views/Template/Index.vue'),
    // If the user needs to be authenticated to view this page.
    meta: {
      auth: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ './views/Login.vue'),
  },
  {
    path: '/invitelogin/:inviteCode',
    name: 'invitelogin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ './views/InviteLogin.vue'),
  },
  { 
    path: '/forgot-email',
    name: 'forgot-email',
    component: () =>
      import(/* webpackChunkName: "forgot-email" */ './views/ForgotEmail.vue'),
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () =>
      import(/* webpackChunkName: "forgot-email" */ './views/ForgotPassword.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ './views/About.vue'),
  },
  {
    path: '/services',
    name: 'services',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "services" */ './views/Services.vue'),
  },
  {
    path: '/estimate',
    name: 'estimate',
    component: () =>
      import(/* webpackChunkName: "estimate" */ './views/Estimate.vue'),
  },
  {
    path: '/conceptScreening',
    name: 'conceptScreening',
    component: () =>
      import(/* webpackChunkName: "conceptScreening" */ './views/ConceptScreening.vue'),
  },
  {
    path: '/getStartedClient/:verifyCode',
    name: 'getStartedClient',
    component: () =>
      import(/* webpackChunkName: "getStartedClient" */ './views/GetStartedClient.vue'),
  },
  {
    path: '/getStartedProf/:verifyCode',
    name: 'getStartedProf',
    component: () =>
      import(/* webpackChunkName: "getStartedProf" */ './views/GetStartedProf.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('./views/estimators/Dashboard.vue'),
    meta: {
      auth: true,
      breadCrumb: 'Dashboard'
    },
    children: [
      {
        path: 'billing',
        component: () => import('./components/dashboard-components/billing/billinginvoice'),
        meta: {
          breadCrumb: 'Billing'
        }
      },
      {
        path: 'index/:id/:type',
        component: () => import('./components/dashboard-components/dashboard/dashboard'),
      },
      {
        path: 'index/:office_name',
        component: () => import('./components/dashboard-components/dashboard/dashboard'),
      },
      {
        path: 'index',
        component: () => import('./components/dashboard-components/dashboard/dashboard'),
        meta: {
          breadCrumb: 'Dashboard'
        }
      },
      {
        path: 'createproject',
        component: () => import('./components/dashboard-components/dashboard/createproject'),
        meta: {
          breadCrumb: 'Create Project'
        }
      },
      {
        path: 'myprojects',
        component: () => import('./components/dashboard-components/myprojects/project'),
        meta: {
          breadCrumb: 'My Projects'
        }
      },
      {
        path: 'projects',
        component: () => import('./components/dashboard-components/myprojects/projectmanager'),
        meta: {
          breadCrumb: 'Projects'
        }
      },
      {
        path: 'projectindex',
        component: () => import('./components/dashboard-components/myprojects/projects2'),
        meta: {
          breadCrumb: 'Projects'
        }
      },
      {
        path: 'adminListEstimators',
        component: () => import(/* webpackChunkName: "adminListEstimators" */ './views/admin/estimators/AdminListEstimators.vue'),
      },
      {
        path: 'adminSearchProjects',
        component: () =>
          import(/* webpackChunkName: "adminSearchProjects" */ './views/admin/clients/AdminSearchProjects.vue'),
      },
      {
        path: 'adminSearchClients',
        component: () =>
          import(/* webpackChunkName: "adminSearchClients" */ './views/admin/clients/AdminSearchClients.vue'),
      },
      {
        path: 'adminInviteClients',
        component: () =>
          import(/* webpackChunkName: "adminInviteClients" */ './views/admin/clients/AdminInviteClients.vue'),
      },
      {
        path: 'companyinvite',
        component: () => import('./components/dashboard-components/invite/invite.vue'),
        meta: {
          breadCrumb: 'Invite Users'
        }
      },
      {
        path: 'addclient',
        component: () => import('./components/dashboard-components/addclient.vue'),
        meta: {
          breadCrumb: 'Add Client'
        }
      },
      {
        path: 'adminInviteProfessionals',
        component: () =>
          import(/* webpackChunkName: "adminInviteProfessionals" */ './views/admin/AdminInviteProfessionals.vue'),
      },
      {
        path: 'settings',
        component: () => import('./components/dashboard-components/setting/setting'),
        meta: {
          breadCrumb: 'Settings'
        }
      },
      {
        path: 'myprofile',
        component: () => import('./components/dashboard-components/myprofile/profile'),
        meta: {
          breadCrumb: 'My Profile'
        }
      },
      {
        path: 'myprojects/detail/:project_id',
        component: () => import('./components/dashboard-components/myprojects/projectdetail'),
        children: [
          {
            path: '',
            component: () => import('./components/dashboard-components/myprojects/projectmanagerdetails'),
          },
          {
            path: 'drawings',
            component: () => import('./components/dashboard-components/myprojects/drawing'),
          },
          {
            path: 'documents',
            component: () => import('./components/dashboard-components/myprojects/projectmanagerdetail'),
          },
          {
            path: 'feesubmission',
            component: () =>
              import('./components/dashboard-components/myprojects/feesubmission'),
          },
          {
            path: 'calculatefee',
            component: () => import('./components/dashboard-components/myprojects/calculatefee'),
          },
          {
            path: 'summary',
            component: () => import('./components/dashboard-components/myprojects/summary'),
          },
          {
            path: 'basisestimate',
            component: () => import('./components/dashboard-components/myprojects/basisestimate'),
          },
          {
            path: 'estimates/:subproject_id',
            component: () => import('./components/dashboard-components/myprojects/estimates'),
          },
        ],
      },
      {
        path: 'projectrequest',
        component: () => import('./components/dashboard-components/projectrequests/projectrequest'),
        meta: {
          breadCrumb: 'Project Request'
        },
        children: [
          {
            path: '',
            component: () => import('./components/dashboard-components/projectrequests/projectrequest'),
          }
        ]
      },
      {
        path: 'projectrequest/client/:id',
        component: () => import('./components/dashboard-components/projectrequests/managerprojectrequest/clientprojectsubdetail'),
      },
      {
        path: 'projectrequest/find/:id',
        component: () =>
          import('./components/dashboard-components/projectrequests/managerprojectrequest/findestimatorsdetail'),
      },
      {
        path: 'projectrequest/request/:id',
        component: () =>
          import('./components/dashboard-components/projectrequests/managerprojectrequest/projectrequesttabdetail'),
      },
      {
        path: 'project-manager/:subproject_id',
        component: () =>
          import('./components/dashboard-components/project-manager/project-manager'),
      }
    ],
  },
  {
    path: '/signup',
    name: 'signUp',
    component: () =>
      import(/* webpackChunkName: "signUp" */ './views/SignUp.vue'),
  },
  {
    path: '/signupclient',
    name: 'signUpClient',
    component: () =>
      import(/* webpackChunkName: "signUpClient" */ './views/SignUpClient.vue'),
  },
  {
    path: '/signupprof',
    name: 'signUpProf',
    component: () =>
      import(/* webpackChunkName: "signUpProf" */ './views/SignUpProf.vue'),
  },
  {
    path: '/resetPassword/:id',
    name: 'resetPassword',
    component: () =>
      import(/* webpackChunkName: "signUpProfConf" */ './views/ResetPassword.vue'),
  },
  {
    path: '/signupconf',
    name: 'signUpConf',
    component: () =>
      import(/* webpackChunkName: "signUpProfConf" */ './views/SignUpConf.vue'),
  },
  {
    path: '/estnotification',
    name: 'EstimatorNotification',
    component: () =>
      import(/* webpackChunkName: "signUpProfConf" */ './views/EstimatorNotification.vue'),
  },
  {
    path: '/confirmEmailAddress/:verifyCode',
    name: 'confirmEmailAddress',
    component: () =>
      import(/* webpackChunkName: "confirmEmailAddress" */ './views/clients/ConfirmEmailAddress.vue'),
  },
  {
    path: '/createClientAccount',
    name: 'createClientAccount',
    component: () =>
      import(/* webpackChunkName: "createClientAccount" */ './views/clients/CreateClientAccount.vue'),
  },
  {
    path: '/clientHome',
    name: 'clientHome',
    component: () =>
      import(/* webpackChunkName: "clientHome" */ './views/clients/ClientHome.vue'),
  },
  {
    path: '/clientManageUsers',
    name: 'clientManageUsers',
    component: () =>
      import(/* webpackChunkName: "clientManageUsers" */ './views/clients/ClientManageUsers.vue'),
  },
  {
    path: '/clientOffices',
    name: 'clientOffices',
    component: () =>
      import(/* webpackChunkName: "clientOffices" */ './views/clients/offices/ClientOffices.vue'),
  },
  {
    path: '/manageClientOffice/:officeId',
    name: 'manageClientOffice',
    component: () =>
      import(/* webpackChunkName: "manageClientOffice" */ './views/clients/offices/ManageClientOffice.vue'),
  },
  {
    path: '/addClientOffice',
    name: 'addClientOffice',
    component: () =>
      import(/* webpackChunkName: "addClientOffice" */ './views/clients/offices/AddClientOffice.vue'),
  },
  {
    path: '/clientEditUser',
    name: 'clientEditUser',
    component: () =>
      import(/* webpackChunkName: "clientEditUser" */ './views/clients/ClientEditUser.vue'),
  },
  {
    path: '/clientInviteUser',
    name: 'clientInviteUser',
    component: () =>
      import(/* webpackChunkName: "clientInviteUser" */ './views/clients/ClientInviteUser.vue'),
  },
  {
    path: '/confirmInvite/:inviteCode',
    name: 'confirmInvite',
    component: () =>
      import(/* webpackChunkName: "confirmInvite" */ './views/clients/ConfirmInvite.vue'),
  },
  {
    path: '/estimators/costProRegistration',
    name: 'costProRegistration',
    component: () =>
      import(/* webpackChunkName: "costProRegistration" */ './views/estimators/CostProRegistration.vue'),
  },
  {
    path: '/estimators/completeCostProRegistration/:inviteCode',
    name: 'completeCostProRegistration',
    component: () =>
      import(/* webpackChunkName: "completeCostProRegistration" */ './views/estimators/CompleteCostProRegistration.vue'),
  },
  {
    path: '/costProHome',
    name: 'costProHome',
    component: () =>
      import(/* webpackChunkName: "costProHome" */ './views/estimators/CostProHome.vue'),
  },
  {
    path: '/costProProfile',
    name: 'costProProfile',
    component: () =>
      import(/* webpackChunkName: "costProProfile" */ './views/estimators/CostProProfile.vue'),
  },
  {
    path: '/costProCurrentProjects',
    name: 'costProCurrentProjects',
    component: () =>
      import(/* webpackChunkName: "costProCurrentProjects" */ './views/estimators/CostProCurrentProjects.vue'),
  },
  {
    path: '/costProPastProjects',
    name: 'costProPastProjects',
    component: () =>
      import(/* webpackChunkName: "costProPastProjects" */ './views/estimators/CostProPastProjects.vue'),
  },
  {
    path: '/costProEditSubProject/:subproject_id',
    name: 'costProEditSubProject',
    component: () =>
      import(/* webpackChunkName: "costProEditSubProject" */ './views/estimators/CostProEditSubProject.vue'),
  },
  {
    path: '/costProViewSubProject/:subproject_id',
    name: 'costProViewSubProject',
    component: () =>
      import(/* webpackChunkName: "costProViewSubProject" */ './views/estimators/CostProViewSubProject.vue'),
  },
  {
    path: '/adminHome',
    name: 'adminHome',
    component: () =>
      import(/* webpackChunkName: "adminHome" */ './views/admin/AdminHome.vue'),
  },
  {
    path: '/adminListEstimators',
    name: 'adminListEstimators',
    component: () =>
      import(/* webpackChunkName: "adminListEstimators" */ './views/admin/estimators/AdminListEstimators.vue'),
  },
  {
    path: '/adminSearchProjects',
    name: 'adminSearchProjects',
    component: () =>
      import(/* webpackChunkName: "adminSearchProjects" */ './views/admin/clients/AdminSearchProjects.vue'),
  },
  {
    path: '/adminSearchClients',
    name: 'adminSearchClients',
    component: () =>
      import(/* webpackChunkName: "adminSearchClients" */ './views/admin/clients/AdminSearchClients.vue'),
  },
  {
    path: '/adminInviteClients',
    name: 'adminInviteClients',
    component: () =>
      import(/* webpackChunkName: "adminInviteClients" */ './views/admin/clients/AdminInviteClients.vue'),
  },
  {
    path: '/adminEditProject',
    name: 'adminEditProject',
    component: () =>
      import(/* webpackChunkName: "adminEditProject" */ './views/admin/clients/AdminEditProject.vue'),
  },
  {
    path: '/adminManageSplitPages',
    name: 'adminManageSplitPages',
    component: () =>
      import(/* webpackChunkName: "adminManageSplitPages" */ './views/admin/clients/AdminManageSplitPages.vue'),
  },
  {
    path: '/adminInviteProfessionals',
    name: 'adminInviteProfessionals',
    component: () =>
      import(/* webpackChunkName: "adminInviteProfessionals" */ './views/admin/AdminInviteProfessionals.vue'),
  },
  {
    //path: "/clientProjects/:project_id",
    path: '/clientProjects',
    name: 'clientProjects',
    component: () =>
      import(/* webpackChunkName: "clientProjects" */ '@/views/clients/projects/ClientProjects.vue'),
  },
  {
    path: '/adminEditSubProject/:subproject_id/:project_id',
    name: 'adminEditSubProject',
    component: () =>
      import(/* webpackChunkName: "adminEditSubProject" */ '@/views/admin/clients/AdminEditSubProject.vue'),
  },
  // otherwise redirect to home
  { path: '*', redirect: '/' },
];
