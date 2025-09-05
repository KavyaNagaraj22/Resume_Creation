import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import CreativeTemplate from './CreativeTemplate';
import RedAccentTemplate from './RedAccentTemplate';
import Resume5 from './resume5';
import Resume6 from './Resume6';
import Resume7 from './Resume7';
import Resume8 from './Resume8';
import Resume9 from './Resume9';
import Resume10 from './Resume10';
import Resume11 from './Resume11';
import Resume12 from './Resume12';
import Resume13 from './Resume13';
import Resume14 from './Resume14';
import Resume15 from './Resume15';

export const templates = [
  { id: 'modern', name: 'Resume 1', component: ModernTemplate },
  { id: 'classic', name: 'Resume 2', component: ClassicTemplate },
  { id: 'creative', name: 'Resume 3', component: CreativeTemplate },
  { id: 'red', name: 'Resume 4', component: RedAccentTemplate },
  { id: "resume5", name: "Resume 5", component: Resume5 },
  { id: "resume6", name: "Resume 6", component: Resume6 },
  { id: "resume7", name: "Resume 7", component: Resume7 },
  { id: "resume8", name: "Resume 8", component: Resume8 },
  { id: "resume9", name: "Resume 9", component: Resume9 }, // Reusing Resume8 for now
  { id: "resume10", name: "Resume 10", component: Resume10 },
  { id: "resume11", name: "Resume 11", component: Resume11 }, // Reusing Resume8 for now
  { id: "resume12", name: "Resume 12", component: Resume12 }, // Reusing Resume8 for now
  { id: "resume13", name: "Resume 13(Applicable only for more then one Page resume)", component: Resume13 }, // Reusing Resume8 for now
  { id: "resume14", name: "Resume 14", component: Resume14 }, // Reusing Resume8 for now
  { id: "resume15", name: "Resume 15", component: Resume15 }, // Reusing Resume8 for now
];