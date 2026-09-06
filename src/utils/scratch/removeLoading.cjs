const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', '..', 'App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

// 1. Remove lazy and Suspense from the first line
content = content.replace(/import { useState, useEffect, lazy, Suspense } from 'react';/, "import { useState, useEffect } from 'react';");

// 2. Replace the lazy imports block with standard imports
const lazyImportsRegex = /\/\/ Composants page en lazy loading — ne se chargent que quand on les visite\n(const [a-zA-Z]+ = lazy[^\n]+\n)+/;
const standardImports = `// Importation synchrone des composants (plus de temps de chargement)
import { CharacterCreation } from './components/CharacterCreation';
import { Dashboard } from './components/Dashboard';
import { MainMenu } from './components/MainMenu';
import { MultiplayerLobby } from './components/MultiplayerLobby';
import { FiveLobby } from './components/FiveLobby';
import { FiveTeamsManager } from './components/FiveTeamsManager';
import { FiveMatch } from './components/FiveMatch';
import { GlobalPalmares } from './components/GlobalPalmares';
import { Achievements } from './components/Achievements';
import { Leaderboard } from './components/Leaderboard';
import { CardCollection } from './components/CardCollection';
import { ClashLobby } from './components/ClashLobby';
import { CosmeticsStore } from './components/CosmeticsStore';
`;
content = content.replace(lazyImportsRegex, standardImports);

// 3. Remove PageLoader component
const pageLoaderRegex = /\/\/ Spinner de fallback Suspense\nconst PageLoader = \(\) => \([\s\S]+?\);\n/;
content = content.replace(pageLoaderRegex, '');

// 4. Remove all <Suspense fallback={<PageLoader />}> wrappers
content = content.replace(/<Suspense fallback=\{<PageLoader \/>\}>\s*</g, '<');
content = content.replace(/<Suspense fallback=\{<PageLoader \/>\}>/g, '');
content = content.replace(/<\/Suspense>/g, '');

fs.writeFileSync(appPath, content);
console.log('App.jsx optimized successfully!');
