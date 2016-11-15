import React from 'react';
import { render } from 'react-dom';
import App from 'components/app';
import 'gridlex/docs/gridlex.css';
import 'gridlex/docs/demo/demo.min.css';
import { Router, Route, Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

render(<App />, document.getElementById('app'));
