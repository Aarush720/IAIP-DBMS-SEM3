import React from 'react';

const ReportPage: React.FC = () => {
    
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-stone-100 text-stone-800 dark:bg-stone-900 dark:text-stone-200 p-8 rounded-lg max-w-4xl mx-auto print:bg-white print:shadow-none print:p-0">
            <div className="flex justify-between items-center mb-8 print:hidden">
                <h1 className="text-3xl font-bold font-heading text-stone-900 dark:text-[#FAF4F4]">Final Project Report</h1>
                <button 
                    onClick={handlePrint}
                    className="bg-[#CF5256] text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 hover:bg-rose-700"
                >
                    Print Report
                </button>
            </div>
            
            <article className="prose prose-lg max-w-none text-stone-900 dark:text-stone-300 prose-headings:text-stone-900 dark:prose-headings:text-stone-100 prose-strong:text-stone-900 dark:prose-strong:text-stone-100 dark:prose-invert">
                <h2 className="text-2xl font-bold">Integrated Academic Insights Portal</h2>
                
                <section className="space-y-4">
                    <h3 className="text-xl font-bold border-b border-stone-300 dark:border-stone-700 pb-2">1. Project Objectives</h3>
                    <p>
                        The primary objective of the Integrated Academic Insights Portal (IAIP) is to develop a centralized, data-driven platform for educational institutions. The portal aims to consolidate disparate academic data sources—including student demographics, course information, faculty assignments, attendance records, and assessment results—into a single, cohesive system. This will empower administrators, faculty, and academic advisors with actionable insights to enhance student outcomes, optimize resource allocation, and improve overall institutional effectiveness.
                    </p>
                </section>
                
                <section className="space-y-4 mt-8">
                    <h3 className="text-xl font-bold border-b border-stone-300 dark:border-stone-700 pb-2">2. Entity-Relationship (ER) Model Summary</h3>
                    <p>
                        The system's database schema is designed around several core entities: <strong>Students</strong>, <strong>Faculty</strong>, <strong>Courses</strong>, <strong>Departments</strong>, <strong>Enrollments</strong>, <strong>Attendance</strong>, and <strong>Assessments</strong>.
                    </p>
                    <ul className="list-disc pl-6">
                        <li><strong>Students</strong> have a one-to-many relationship with <strong>Enrollments</strong>.</li>
                        <li><strong>Courses</strong> also have a one-to-many relationship with <strong>Enrollments</strong>, creating a many-to-many relationship between Students and Courses, resolved by the Enrollments entity.</li>
                        <li><strong>Faculty</strong> have a one-to-many relationship with <strong>Courses</strong> (an instructor teaches many courses).</li>
                        <li><strong>Departments</strong> have a one-to-many relationship with both <strong>Faculty</strong> and <strong>Courses</strong>.</li>
                    </ul>
                </section>
                
                <section className="space-y-4 mt-8">
                    <h3 className="text-xl font-bold border-b border-stone-300 dark:border-stone-700 pb-2">3. BCNF Justification</h3>
                    <p>
                        All relations in the database schema have been normalized to Boyce-Codd Normal Form (BCNF). This was achieved by ensuring that for every non-trivial functional dependency X → Y, X is a superkey of the relation.
                    </p>
                    <p>
                        For example, in the <strong>Enrollments</strong> relation with attributes (<u>StudentID</u>, <u>CourseID</u>, Semester, Grade), the primary key is a composite of {`StudentID, CourseID`}. All non-key attributes like `Semester` and `Grade` are fully functionally dependent on the entire primary key. There are no dependencies where a part of the key determines a non-key attribute, nor are there any dependencies where a non-key attribute determines another non-key attribute. This decomposition prevents data redundancy and avoids update, insertion, and deletion anomalies, ensuring data integrity across the platform.
                    </p>
                </section>
            </article>
        </div>
    );
};

export default ReportPage;