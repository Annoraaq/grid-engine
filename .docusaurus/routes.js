
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';
export default [
{
  path: '/__docusaurus/debug',
  component: ComponentCreator('/__docusaurus/debug','3d6'),
  exact: true,
},
{
  path: '/__docusaurus/debug/config',
  component: ComponentCreator('/__docusaurus/debug/config','914'),
  exact: true,
},
{
  path: '/__docusaurus/debug/content',
  component: ComponentCreator('/__docusaurus/debug/content','c28'),
  exact: true,
},
{
  path: '/__docusaurus/debug/globalData',
  component: ComponentCreator('/__docusaurus/debug/globalData','3cf'),
  exact: true,
},
{
  path: '/__docusaurus/debug/metadata',
  component: ComponentCreator('/__docusaurus/debug/metadata','31b'),
  exact: true,
},
{
  path: '/__docusaurus/debug/registry',
  component: ComponentCreator('/__docusaurus/debug/registry','0da'),
  exact: true,
},
{
  path: '/__docusaurus/debug/routes',
  component: ComponentCreator('/__docusaurus/debug/routes','244'),
  exact: true,
},
{
  path: '/',
  component: ComponentCreator('/','6d6'),
  
  routes: [
{
  path: '/',
  component: ComponentCreator('/','546'),
  exact: true,
},
{
  path: '/api/characterdata',
  component: ComponentCreator('/api/characterdata','888'),
  exact: true,
},
{
  path: '/api/direction',
  component: ComponentCreator('/api/direction','236'),
  exact: true,
},
{
  path: '/api/gridengineconfig',
  component: ComponentCreator('/api/gridengineconfig','3ef'),
  exact: true,
},
{
  path: '/api/position',
  component: ComponentCreator('/api/position','a7b'),
  exact: true,
},
{
  path: '/api/walkinganimationmapping',
  component: ComponentCreator('/api/walkinganimationmapping','d84'),
  exact: true,
},
{
  path: '/methods',
  component: ComponentCreator('/methods','602'),
  exact: true,
},
]
},
{
  path: '*',
  component: ComponentCreator('*')
}
];
