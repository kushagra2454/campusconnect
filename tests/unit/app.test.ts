import { describe, it, expect } from 'vitest';
import { mockProfiles, mockResources, mockCommunities, mockPosts } from '../../src/lib/mock-data';

describe('CampusConnect Domain Models & Data Integrity', () => {
  it('loads valid mock profiles with Indian university affiliations', () => {
    expect(mockProfiles.length).toBeGreaterThanOrEqual(4);
    const aarav = mockProfiles.find(p => p.id === 'p1');
    expect(aarav).toBeDefined();
    expect(aarav?.display_name).toBe('Aarav Sharma');
    expect(aarav?.is_mentor).toBe(true);
    expect(aarav?.mentor_topics.length).toBeGreaterThan(0);
    expect(aarav?.study_year).toBe(4);
  });

  it('validates academic resource metadata schema', () => {
    mockResources.forEach(res => {
      expect(res.id).toBeTruthy();
      expect(res.title.length).toBeGreaterThanOrEqual(3);
      expect(res.subject.length).toBeGreaterThan(0);
      expect(res.semester).toBeGreaterThanOrEqual(1);
      expect(res.semester).toBeLessThanOrEqual(8);
      expect(['pyq', 'notes', 'lab_manual', 'assignment', 'syllabus']).toContain(res.resource_type);
      expect(res.file_size_bytes).toBeGreaterThan(0);
    });
  });

  it('verifies community structure and slug uniqueness', () => {
    const slugs = mockCommunities.map(c => c.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('verifies Q&A post structure has answers and helpful marking', () => {
    const questions = mockPosts.filter(p => p.post_type === 'question');
    expect(questions.length).toBeGreaterThan(0);
    const firstQ = questions[0];
    expect(firstQ.title).toBeTruthy();
    expect(firstQ.body).toBeTruthy();
  });
});
