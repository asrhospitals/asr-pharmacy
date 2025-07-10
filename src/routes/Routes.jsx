import React from 'react';
import Dashboard from '../pages/Dashboard';
import GenericPage from '../pages/GenericPage';
import {useNavigation} from '../hooks/useNavigation';
import ItemsPage from '../pages/masters/inventory/Item/Item';
import StorePage from '../pages/masters/inventory/store/Store';
import RackPage from '../pages/masters/inventory/rack/Rack';
import Company from '../pages/masters/inventory/company/Company';
import SaltPage from '../pages/masters/inventory/salt/Salt';
import UnitPage from '../pages/masters/inventory/unit/Unit';
import HSNPage from '../pages/masters/inventory/hsn/HSN';
import MFRPage from '../pages/masters/inventory/menufcurer/MFR';
import BillPage from '../pages/purchase/Bill';
import Viewledger from '../pages/masters/account/Ledger/Viewledger';


const Router = () => {
  const { currentPath } = useNavigation();
  
  const routes = {
    '/dashboard': { component: Dashboard, title: 'Dashboard' },


    ///-----------Account--------------------
    '/master/accounts/ledger': { component:Viewledger, title: 'Ledger', props: { title: 'Ledger', path: '/master/accounts/ledger' }},
    '/master/accounts/group': { component:GenericPage, title: 'Group', props: { title: 'Group', path: '/master/accounts/group' }},
    '/master/accounts/sale': { component:GenericPage, title: 'Sale', props: { title: 'Sale', path: '/master/accounts/sale' }},
    '/master/accounts/purchase': { component:GenericPage, title: 'Purchase', props: { title: 'Purchase', path: '/master/accounts/purchase' }},


   

    //////--------Inventory--------------------//////////////
    '/master/inventory/items': { component: ItemsPage, title: 'Items', props: { title: 'Items', path: '/master/inventory/items' }},
    '/master/inventory/stores': { component: StorePage, title: 'Store', props: { title: 'Store', path: '/master/inventory/stores' }},
    '/master/inventory/units': { component: UnitPage, title: 'Units', props: { title: 'Units', path: '/master/inventory/units' }},
    '/master/inventory/racks': { component: RackPage, title: 'Racks', props: { title: 'Racks', path: '/master/inventory/racks' }},
    '/master/inventory/companys': { component: Company, title: 'Company', props: { title: 'Company', path: '/master/inventory/companys' }},
    '/master/inventory/salts': { component: SaltPage, title: 'Salt', props: { title: 'Salt', path: '/master/inventory/salts' }},
    '/master/inventory/sacs': { component: HSNPage, title: 'HSN/SAC', props: { title: 'HSN/SAC', path: '/master/inventory/sacs' }},
    '/master/inventory/manufacturers': { component: MFRPage, title: 'Manufacturer', props: { title: 'Manufacturer', path: '/master/inventory/manufacturers' }},


    
    
    //////------------Sale----------------///////////
    '/sales/orders': { component: GenericPage, title: 'Orders', props: { title: 'Orders', path: '/sales/orders' }},
    '/sales/bill': { component: GenericPage, title: 'Bill', props: { title: 'Bill', path: '/sales/bill' }},
    '/sales/countersale': { component: GenericPage, title: 'Counter Sale', props: { title: 'Counter Sale', path: '/sales/countersale' }},
    '/sales/stockissue': { component: GenericPage, title: 'Stock Issue', props: { title: 'Stock Issue', path: '/sales/stockissue' }},
    '/sales/quotations': { component: GenericPage, title: 'Quotations', props: { title: 'Quotations', path: '/sales/quotations' }},
    

    ////////-----------Purchase-------------//////////////////


    '/purchase/order': { component: GenericPage, title: 'Order', props: { title: 'Order', path: '/purchase/order' }},
    '/purchase/bill': { component: BillPage, title: 'Bill', props: { title: 'Bill', path: '/purchase/bill' }},
    '/purchase/stockreceive': { component: GenericPage, title: 'Stock Receive', props: { title: 'Stock Receive', path: '/purchase/stockreceive' }},
    '/purchase/return': { component: GenericPage, title: 'Return', props: { title: 'Return', path: '/purchase/return' }},
    '/purchase/brkexp': { component: GenericPage, title: 'Brk/Exp Issue', props: { title: 'Brk/Exp Issue', path: '/purchase/brkexp' }},
   
  };

  const route = routes[currentPath] || routes['/dashboard'];
  const Component = route.component;
  
  return <Component {...(route.props || {})} />;
};

export default Router;