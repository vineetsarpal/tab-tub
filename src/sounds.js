// Sound utility for TabTub extension
// Uses Web Audio API to generate simple, pleasant button click sounds

class SoundManager {
  constructor() {
    this.audioContext = null;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  async ensureAudioContext() {
    if (!this.audioContext) return false;
    
    if (this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
      } catch (error) {
        console.warn('Could not resume audio context:', error);
        return false;
      }
    }
    return true;
  }

  // Create a pleasant click sound for primary actions
  async playPrimaryClick() {
    if (!(await this.ensureAudioContext())) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Pleasant upward sweep for positive actions
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
    
    oscillator.type = 'sine';
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.15);
  }

  // Create a satisfying "whoosh" sound for bulk actions
  async playBulkAction() {
    if (!(await this.ensureAudioContext())) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Swoosh sound with frequency sweep
    oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.2);
    
    filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.25);
    
    oscillator.type = 'triangle';
    filter.type = 'lowpass';
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.25);
  }

  // Create a gentle "pop" sound for delete actions
  async playDelete() {
    if (!(await this.ensureAudioContext())) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Quick pop sound
    oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
    
    oscillator.type = 'square';
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  // Create a warning sound for destructive actions
  async playWarning() {
    if (!(await this.ensureAudioContext())) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Subtle warning tone
    oscillator.frequency.setValueAtTime(500, this.audioContext.currentTime);
    oscillator.frequency.setValueAtTime(650, this.audioContext.currentTime + 0.05);
    oscillator.frequency.setValueAtTime(500, this.audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.06, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
    
    oscillator.type = 'triangle';
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.15);
  }
}

// Create a singleton instance
const soundManager = new SoundManager();

// Export convenience functions
export const playTubIt = () => soundManager.playPrimaryClick();
export const playTubAll = () => soundManager.playBulkAction();
export const playEmptyTub = () => soundManager.playWarning();
export const playDeleteTab = () => soundManager.playDelete();

export default soundManager;