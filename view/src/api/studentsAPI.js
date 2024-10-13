export const createStudent = async (studentData) => {
    try {
        const response = await fetch('http://localhost:9000/students', {
            method: 'POST',
            body: JSON.stringify(studentData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        }
    } catch (error) {
        throw new Error(error.message);
    }
};