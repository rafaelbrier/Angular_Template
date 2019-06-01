import { Input, Directive, OnDestroy, HostListener } from '@angular/core';

@Directive({ selector: '[appTooltip]' })
export class TooltipDirective implements OnDestroy {

    private tooltipElement: any;

    @Input()
    appTooltip = '';

    @Input()
    tooltipPosition = 'top';

    @HostListener('mouseenter', ['$event'])
    onMouseEnter(event): void {
        this.createTooltip(event);
    }

    private createTooltip(event): void {
        if (this.appTooltip && this.appTooltip.trim() !== '') {
            this.createTooltipDivOnBody();
            this.setTooltipPosition(event);
        }
    }

    private setTooltipPosition(event): void {
        const elementPositions = event.target.getBoundingClientRect();
        const top = this.getPositionTop(elementPositions);
        const left = this.getPositionLeft(elementPositions);
        this.tooltipElement.style.cssText = `left: ${left}px; top: ${top}px`;
    }

    private createTooltipDivOnBody(): void {
        this.tooltipElement = document.createElement('div');
        this.tooltipElement.innerHTML = this.appTooltip;
        this.tooltipElement.className = `show-tooltip ${this.tooltipPosition}`;
        document.body.appendChild(this.tooltipElement);
    }

    private getPositionTop(elementPositions): number {
        switch (this.tooltipPosition) {
            case 'top':
                return elementPositions.top - this.tooltipElement.offsetHeight - 10;
            case 'left':
                return elementPositions.top;
            case 'right':
                return elementPositions.top;
            case 'bottom':
                return elementPositions.bottom + 10;
        }
    }

    private getPositionLeft(elementPositions): number {
        switch (this.tooltipPosition) {
            case 'top':
                return elementPositions.left + (elementPositions.width / 2) - (this.tooltipElement.offsetWidth / 2);
            case 'left':
                return elementPositions.left - this.tooltipElement.offsetWidth - 10;
            case 'right':
                return elementPositions.left + elementPositions.width + 10;
            case 'bottom':
                return elementPositions.left + (elementPositions.width / 2) - (this.tooltipElement.offsetWidth / 2);
        }
    }

    @HostListener('mouseleave', ['$event'])
    onMouseLeave(event): void {
        this.hideTooltip();
    }

    ngOnDestroy(): void {
        this.hideTooltip();
    }

    private hideTooltip(): void {
        if (this.tooltipElement) {
            const childs: NodeList = document.body.childNodes;
            let child = null;
            childs.forEach(c => {
                child = c === this.tooltipElement;
            });
            if (child) {
                document.body.removeChild(this.tooltipElement);
            }
        }
    }

}
