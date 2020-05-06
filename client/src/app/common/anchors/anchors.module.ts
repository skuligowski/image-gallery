import { NgModule } from '@angular/core';

import { AnchorsDirective } from './anchors.directive';
import { AnchorDirective } from './anchor.directive';

@NgModule({
    imports: [ ],
    exports: [ AnchorsDirective, AnchorDirective ],
    declarations: [ AnchorsDirective, AnchorDirective ],
    providers: [],
})
export class AnchorsModule { }
