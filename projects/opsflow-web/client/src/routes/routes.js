import DashboardLayout from '../pages/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/GeneralViews/NotFoundPage.vue'
// Dashboard pages
import Overview from '../pages/Dashboard/Dashboard/Overview.vue'
import Stats from '../pages/Dashboard/Dashboard/Stats.vue'

// Pages
import User from '../pages/Dashboard/Pages/UserProfile.vue'
import TimeLine from '../pages/Dashboard/Pages/TimeLinePage.vue'
import Login from '../pages/Dashboard/Pages/Login.vue'
import Register from '../pages/Dashboard/Pages/Register.vue'
import Lock from '../pages/Dashboard/Pages/Lock.vue'
import AceHub from '../pages/Dashboard/Platforms/AceHub.vue'

// Components pages
import Buttons from '../pages/Dashboard/Components/Buttons.vue'
import GridSystem from '../pages/Dashboard/Components/GridSystem.vue'
import Panels from '../pages/Dashboard/Components/Panels.vue'
const SweetAlert = () => import('../pages/Dashboard/Components/SweetAlert.vue')
import Notifications from '../pages/Dashboard/Components/Notifications.vue'
import Icons from '../pages/Dashboard/Components/Icons.vue'
import Typography from '../pages/Dashboard/Components/Typography.vue'

// Forms pages
const RegularForms = () => import('../pages/Dashboard/Forms/RegularForms.vue')
const ExtendedForms = () => import('../pages/Dashboard/Forms/ExtendedForms.vue')
const ValidationForms = () => import('../pages/Dashboard/Forms/ValidationForms.vue')
const Wizard = () => import('../pages/Dashboard/Forms/Wizard.vue')

// TableList pages
const RegularTables = () => import('../pages/Dashboard/Tables/RegularTables.vue')
const ExtendedTables = () => import('../pages/Dashboard/Tables/ExtendedTables.vue')
const PaginatedTables = () => import('../pages/Dashboard/Tables/PaginatedTables.vue')

// Calendar
const Calendar = () => import('../pages/Dashboard/Calendar/CalendarRoute.vue')
// Charts
const Charts = () => import('../pages/Dashboard/Charts.vue')

let componentsMenu = {
  path: '/components',
  component: DashboardLayout,
  redirect: '/components/buttons',
  children: [
    {
      path: 'buttons',
      name: 'Buttons',
      component: Buttons
    },
    {
      path: 'grid-system',
      name: 'Grid System',
      component: GridSystem
    },
    {
      path: 'panels',
      name: 'Panels',
      component: Panels
    },
    {
      path: 'sweet-alert',
      name: 'Sweet Alert',
      component: SweetAlert
    },
    {
      path: 'notifications',
      name: 'Notifications',
      component: Notifications
    },
    {
      path: 'icons',
      name: 'Icons',
      component: Icons
    },
    {
      path: 'typography',
      name: 'Typography',
      component: Typography
    }

  ]
}
let formsMenu = {
  path: '/forms',
  component: DashboardLayout,
  redirect: '/forms/regular',
  children: [
    {
      path: 'regular',
      name: 'Regular Forms',
      component: RegularForms
    },
    {
      path: 'extended',
      name: 'Extended Forms',
      component: ExtendedForms
    },
    {
      path: 'validation',
      name: 'Validation Forms',
      component: ValidationForms
    },
    {
      path: 'wizard',
      name: 'Wizard',
      component: Wizard
    }
  ]
}

let tablesMenu = {
  path: '/table-list',
  component: DashboardLayout,
  redirect: '/table-list/regular',
  children: [
    {
      path: 'regular',
      name: 'Regular Tables',
      component: RegularTables
    },
    {
      path: 'extended',
      name: 'Extended Tables',
      component: ExtendedTables
    },
    {
      path: 'paginated',
      name: 'Paginated Tables',
      component: PaginatedTables
    }]
}

let pagesMenu = {
  path: '/pages',
  component: DashboardLayout,
  redirect: '/pages/user',
  children: [
    {
      path: 'user',
      name: 'User Page',
      component: User
    },
    {
      path: 'timeline',
      name: 'Timeline Page',
      component: TimeLine
    }
  ]
}

let loginPage = {
  path: '/login',
  name: 'Login',
  component: Login
}

let registerPage = {
  path: '/register',
  name: 'Register',
  component: Register
}

let lockPage = {
  path: '/lock',
  name: 'Lock',
  component: Lock
}

const routes = [
  {
    path: '/',
    redirect: '/admin/overview'
  },
  componentsMenu,
  formsMenu,
  tablesMenu,
  pagesMenu,
  loginPage,
  registerPage,
  lockPage,
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'stats',
        name: 'Stats',
        component: Stats
      },
      {
        path: 'calendar',
        name: 'Calendar',
        component: Calendar
      },
      {
        path: 'charts',
        name: 'Charts',
        component: Charts
      },
      {
        path: '/platforms/aceHub',
        name: 'AceHub',
        component: AceHub
      },
    ]
  },
  {path: '*', component: NotFound}
]

export default routes
