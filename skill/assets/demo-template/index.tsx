import React from 'react';
import {registerRoot, Composition} from 'remotion';
import {ChaiFilm} from './src/ChaiFilm';

const Root = () => <Composition id="ChaiEconomics" component={ChaiFilm} durationInFrames={1800} fps={60} width={1920} height={1080}/>;
registerRoot(Root);
