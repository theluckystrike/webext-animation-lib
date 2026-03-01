/**
 * Animate — CSS/JS animation utilities for extension UIs
 */
export class Animate {
    /** Fade in */
    static fadeIn(el: HTMLElement, durationMs: number = 300): Promise<void> {
        el.style.opacity = '0'; el.style.transition = `opacity ${durationMs}ms ease`;
        requestAnimationFrame(() => { el.style.opacity = '1'; });
        return new Promise((r) => setTimeout(r, durationMs));
    }

    /** Fade out */
    static fadeOut(el: HTMLElement, durationMs: number = 300): Promise<void> {
        el.style.transition = `opacity ${durationMs}ms ease`; el.style.opacity = '0';
        return new Promise((r) => setTimeout(r, durationMs));
    }

    /** Slide down (reveal) */
    static slideDown(el: HTMLElement, durationMs: number = 300): Promise<void> {
        el.style.overflow = 'hidden'; el.style.maxHeight = '0'; el.style.transition = `max-height ${durationMs}ms ease`;
        requestAnimationFrame(() => { el.style.maxHeight = el.scrollHeight + 'px'; });
        return new Promise((r) => setTimeout(() => { el.style.maxHeight = ''; el.style.overflow = ''; r(); }, durationMs));
    }

    /** Slide up (collapse) */
    static slideUp(el: HTMLElement, durationMs: number = 300): Promise<void> {
        el.style.overflow = 'hidden'; el.style.maxHeight = el.scrollHeight + 'px'; el.style.transition = `max-height ${durationMs}ms ease`;
        requestAnimationFrame(() => { el.style.maxHeight = '0'; });
        return new Promise((r) => setTimeout(r, durationMs));
    }

    /** Scale pop */
    static pop(el: HTMLElement, durationMs: number = 200): Promise<void> {
        el.style.transform = 'scale(0.8)'; el.style.transition = `transform ${durationMs}ms cubic-bezier(0.175,0.885,0.32,1.275)`;
        requestAnimationFrame(() => { el.style.transform = 'scale(1)'; });
        return new Promise((r) => setTimeout(r, durationMs));
    }

    /** Shake (error feedback) */
    static shake(el: HTMLElement, durationMs: number = 400): Promise<void> {
        el.style.animation = `shake ${durationMs}ms ease`;
        if (!document.getElementById('shake-style')) {
            const s = document.createElement('style'); s.id = 'shake-style';
            s.textContent = '@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-5px)}40%,80%{transform:translateX(5px)}}';
            document.head.appendChild(s);
        }
        return new Promise((r) => setTimeout(() => { el.style.animation = ''; r(); }, durationMs));
    }

    /** Pulse */
    static pulse(el: HTMLElement, count: number = 2): Promise<void> {
        el.style.animation = `pulse ${600}ms ease ${count}`;
        if (!document.getElementById('pulse-style')) {
            const s = document.createElement('style'); s.id = 'pulse-style';
            s.textContent = '@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}';
            document.head.appendChild(s);
        }
        return new Promise((r) => setTimeout(() => { el.style.animation = ''; r(); }, 600 * count));
    }

    /** Highlight flash */
    static highlight(el: HTMLElement, color: string = '#FBBF24', durationMs: number = 800): Promise<void> {
        const orig = el.style.backgroundColor;
        el.style.transition = `background-color ${durationMs / 2}ms ease`;
        el.style.backgroundColor = color;
        return new Promise((r) => setTimeout(() => { el.style.backgroundColor = orig; setTimeout(r, durationMs / 2); }, durationMs / 2));
    }
}
