import { NgModule } from '@angular/core';

import { AnchorComponent } from './anchor.component';
import { AnchorsDirective } from './anchors.directive';

@NgModule({
    imports: [ ],
    exports: [ AnchorComponent, AnchorsDirective ],
    declarations: [ AnchorComponent, AnchorsDirective ],
    providers: [],
})
export class AnchorsModule { }
