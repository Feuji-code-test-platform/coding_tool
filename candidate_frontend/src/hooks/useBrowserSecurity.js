import { useEffect, useState } from 'react';

function useBrowserSecurity(onViolation, options = {}) {
  const { enabled = true } = options;
  const [violations, setViolations] = useState([]);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    // 1. Tab Switching Detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const violation = {
          type: 'tab_switch',
          severity: 'high',
          timestamp: new Date().toISOString(),
          message: 'Candidate switched tabs or minimized window'
        };
        setViolations(prev => [...prev, violation]);
        onViolation(violation);
      }
    };

    // 2. Right Click Blocking
    const handleContextMenu = (e) => {
      e.preventDefault();
      const violation = {
        type: 'right_click_attempt',
        severity: 'medium',
        timestamp: new Date().toISOString(),
        message: 'Candidate attempted to right-click'
      };
      onViolation(violation);
      return false;
    };

    // 3. Copy/Paste Blocking
    const handleCopy = (e) => {
      // Allow copy only from code editor
      if (!e.target.closest('.monaco-editor')) {
        e.preventDefault();
        onViolation({
          type: 'copy_attempt',
          severity: 'high',
          timestamp: new Date().toISOString(),
          message: 'Copy attempt detected outside code editor'
        });
      }
    };

    const handlePaste = (e) => {
      // Allow paste only in code editor
      if (!e.target.closest('.monaco-editor')) {
        e.preventDefault();
        onViolation({
          type: 'paste_attempt',
          severity: 'high',
          timestamp: new Date().toISOString(),
          message: 'Paste attempt detected outside code editor'
        });
      }
    };

    // 4. DevTools Detection
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        onViolation({
          type: 'devtools_opened',
          severity: 'critical',
          timestamp: new Date().toISOString(),
          message: 'Developer tools detected'
        });
      }
    };

    // 5. Fullscreen Monitoring
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onViolation({
          type: 'fullscreen_exit',
          severity: 'high',
          timestamp: new Date().toISOString(),
          message: 'Candidate exited fullscreen mode'
        });
      }
    };

    // 6. Screenshot Prevention
    const preventScreenshot = (e) => {
      // Windows/Linux: PrintScreen
      // Mac: Cmd+Shift+3/4/5
      if (e.key === 'PrintScreen' || 
          (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key))) {
        e.preventDefault();
        onViolation({
          type: 'screenshot_attempt',
          severity: 'high',
          timestamp: new Date().toISOString(),
          message: 'Screenshot attempt detected'
        });
      }
    };

    // 7. Multi-Monitor Detection
    const detectMultiMonitor = async () => {
      if (window.screen.isExtended) {
        onViolation({
          type: 'multi_monitor_detected',
          severity: 'medium',
          timestamp: new Date().toISOString(),
          message: 'Multiple monitors detected'
        });
      }
    };

    // 8. Window Blur (losing focus)
    const handleBlur = () => {
      onViolation({
        type: 'window_blur',
        severity: 'medium',
        timestamp: new Date().toISOString(),
        message: 'Window lost focus'
      });
    };

    // 9. Keyboard Shortcuts Detection
    const handleKeyboardShortcuts = (e) => {
      // Ctrl+C, Ctrl+V, Ctrl+A, Ctrl+F (outside code editor)
      if (e.ctrlKey || e.metaKey) {
        if (!e.target.closest('.monaco-editor')) {
          const blockedKeys = ['c', 'v', 'a', 'f', 'x'];
          if (blockedKeys.includes(e.key.toLowerCase())) {
            e.preventDefault();
            onViolation({
              type: 'shortcut_attempt',
              severity: 'medium',
              timestamp: new Date().toISOString(),
              message: `Keyboard shortcut Ctrl+${e.key.toUpperCase()} blocked`
            });
          }
        }
      }
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', preventScreenshot);
    document.addEventListener('keydown', handleKeyboardShortcuts);
    window.addEventListener('blur', handleBlur);
    
    // Check DevTools every 1 second
    const devToolsInterval = setInterval(detectDevTools, 1000);
    
    // Check multi-monitor on mount
    detectMultiMonitor();

    // Enter fullscreen on mount
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error('Could not enter fullscreen:', err);
      });
    }

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', preventScreenshot);
      document.removeEventListener('keydown', handleKeyboardShortcuts);
      window.removeEventListener('blur', handleBlur);
      clearInterval(devToolsInterval);
    };
  }, [onViolation, enabled]);

  return violations;
}

export default useBrowserSecurity;
