import { NextResponse } from "next/server";

export async function POST(req) {
  // Mock course data for testing
  const mockCourses = [
    {
      id: "physics-101",
      courseId: "physics-101",
      title: "Physics 101",
      description: "Introduction to basic physics concepts",
      category: "Science",
      tags: "physics,mechanics,energy",
      createdBy: "demo-user"
    },
    {
      id: "chemistry-101",
      courseId: "chemistry-101",
      title: "Chemistry 101",
      description: "Fundamentals of chemistry",
      category: "Science",
      tags: "chemistry,atoms,reactions",
      createdBy: "demo-user"
    },
    {
      id: "math-101",
      courseId: "math-101",
      title: "Mathematics 101",
      description: "Introduction to calculus and algebra",
      category: "Mathematics",
      tags: "math,calculus,algebra",
      createdBy: "demo-user"
    }
  ];

  return NextResponse.json({ result: mockCourses }, { status: 200 });
}

export async function GET(req) {
  const { searchParams } = new URL(req.nextUrl);
  const courseId = searchParams.get("courseId");

  if (!courseId) {
    return NextResponse.json(
      { error: "courseId is required" },
      { status: 400 }
    );
  }

  // Mock course details for testing
  const mockCourses = {
    "physics-101": {
      id: "physics-101",
      courseId: "physics-101",
      title: "Physics 101",
      description: "Introduction to basic physics concepts including mechanics, thermodynamics, and electromagnetism. This course covers Newton's laws of motion, conservation of energy, and basic circuit theory.",
      category: "Science",
      tags: "physics,mechanics,energy",
      studyMaterial: "Chapter 1: Introduction to Physics\nChapter 2: Mechanics\nChapter 3: Energy and Work\nChapter 4: Thermodynamics\nChapter 5: Electromagnetism",
      createdBy: "demo-user"
    },
    "chemistry-101": {
      id: "chemistry-101",
      courseId: "chemistry-101",
      title: "Chemistry 101",
      description: "Fundamentals of chemistry including atomic structure, periodic table, chemical bonding, and reactions. This course provides a foundation for understanding how matter interacts.",
      category: "Science",
      tags: "chemistry,atoms,reactions",
      studyMaterial: "Chapter 1: Atomic Structure\nChapter 2: The Periodic Table\nChapter 3: Chemical Bonding\nChapter 4: Chemical Reactions\nChapter 5: Acids and Bases",
      createdBy: "demo-user"
    },
    "math-101": {
      id: "math-101",
      courseId: "math-101",
      title: "Mathematics 101",
      description: "Introduction to calculus and algebra, covering functions, limits, derivatives, integrals, and linear algebra concepts. This course builds critical mathematical thinking skills.",
      category: "Mathematics",
      tags: "math,calculus,algebra",
      studyMaterial: "Chapter 1: Functions and Graphs\nChapter 2: Limits and Continuity\nChapter 3: Derivatives\nChapter 4: Integrals\nChapter 5: Linear Algebra Introduction",
      createdBy: "demo-user"
    }
  };

  const course = mockCourses[courseId];

  if (!course) {
    return NextResponse.json(
      { error: "Course not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ result: course }, { status: 200 });
} 