// import React from 'react'
// import NotFound from "./pages/404";
// import { Navigate } from 'react-router-dom';
// const Home = lazy(() => import("./pages/home"));
// const Login = lazy(() => import("./pages/login"));
// const UserDashboard = lazy(() => import("./pages/user-dashboard"));
// const Shop = lazy(() => import("./pages/shop/shop.page"));


// const routes = [
//     {
//         path:'/',
//         element:<Home/>,
//         children:[
//             {path:'shop',element:<Shop/>},
//             {path:'login',element:<Login/>},
//             { path: '404', element: <NotFound /> },
//             {path: '*', element: <Navigate to="/404" /> }

//         ]
//     },
//     {
//         path:'/user',
//         element:<UserDashboard/>,
//         children:[
//             // {path:'account',element:},
//             // {path:'user-info',element:},
//             // {path:'cart',element:},
//             {path:'add-product',element:},
//             { path: '*', element: <Navigate to="/404" /> }

//         ]
//     },
//     {
//         path:'/admin',
//         element:'',
//         children:[
//             // {path:'site-info',element:},
//             {path:'add-category',element:},
//             { path: '*', element: <Navigate to="/404" /> }

//         ]
//     }
// ];


// export default routes;