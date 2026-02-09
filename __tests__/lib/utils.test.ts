import { cn } from '@/lib/utils';

describe('Utils', () => {
  describe('cn', () => {
    it('merges class names', () => {
      const result = cn('text-red-500', 'bg-blue-500');
      expect(result).toContain('text-red-500');
      expect(result).toContain('bg-blue-500');
    });

    it('handles conditional class names', () => {
      const result = cn('base-class', true && 'conditional-class', false && 'not-included');
      expect(result).toContain('base-class');
      expect(result).toContain('conditional-class');
      expect(result).not.toContain('not-included');
    });

    it('merges Tailwind classes correctly', () => {
      const result = cn('px-4', 'px-8');
      // twMerge should keep only the last px value
      expect(result).toBe('px-8');
    });

    it('handles arrays of class names', () => {
      const result = cn(['text-sm', 'font-bold'], 'text-red-500');
      expect(result).toContain('text-sm');
      expect(result).toContain('font-bold');
      expect(result).toContain('text-red-500');
    });

    it('handles undefined and null values', () => {
      const result = cn('base', undefined, null, 'class');
      expect(result).toContain('base');
      expect(result).toContain('class');
    });

    it('handles empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('deduplicates identical classes', () => {
      const result = cn('text-red-500', 'text-red-500');
      expect(result).toBe('text-red-500');
    });

    it('handles complex conditional scenarios', () => {
      const isActive = true;
      const isDisabled = false;
      const result = cn(
        'base-class',
        isActive && 'active-class',
        isDisabled && 'disabled-class',
        !isDisabled && 'enabled-class'
      );
      expect(result).toContain('base-class');
      expect(result).toContain('active-class');
      expect(result).toContain('enabled-class');
      expect(result).not.toContain('disabled-class');
    });
  });
});
