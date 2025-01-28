class GroupingAlgorithm {
  // static createBalancedGroups(sortedStudents, groupSize) {
  //   const numGroups = Math.ceil(sortedStudents.length / groupSize);
    
  //   const groups = Array.from({ length: numGroups }, () => ({
  //     students: [],
  //     skills: new Set()
  //   }));
  
  //   // Keep track of assigned students
  //   const assignedStudents = new Set();
  
  //   const calculateSkillOverlap = (group, student) => {
  //     const studentSkills = new Set(
  //       student.skills
  //         .filter(skill => skill.hasSkill)
  //         .map(skill => skill.skillName)
  //     );
  //     let overlap = 0;
  //     group.skills.forEach(skill => {
  //       if (studentSkills.has(skill)) overlap++;
  //     });
  //     return overlap;
  //   };
  
  //   // Distribute students to groups
  //   sortedStudents.forEach(student => {
  //     // Skip if student is already assigned
  //     if (assignedStudents.has(student.id)) return;
  
  //     let minOverlap = Infinity;
  //     let bestGroup = null;
  
  //     groups.forEach(group => {
  //       const targetSize = Math.ceil(sortedStudents.length / numGroups);
  //       if (group.students.length >= targetSize) return;
  
  //       const overlap = calculateSkillOverlap(group, student);
        
  //       if (overlap === minOverlap) {
  //         if (!bestGroup || group.students.length < bestGroup.students.length) {
  //           bestGroup = group;
  //         }
  //       } else if (overlap < minOverlap) {
  //         minOverlap = overlap;
  //         bestGroup = group;
  //       }
  //     });
  
  //     if (!bestGroup) {
  //       bestGroup = groups.reduce((min, group) => 
  //         !min || group.students.length < min.students.length ? group : min
  //       , null);
  //     }
  
  //     // Add student to best group and mark as assigned
  //     bestGroup.students.push(student);
  //     assignedStudents.add(student.id);
      
  //     student.skills
  //       .filter(skill => skill.hasSkill)
  //       .forEach(skill => bestGroup.skills.add(skill.skillName));
  //   });
  
  //   return groups.filter(group => group.students.length > 0);
  // }

  static groupingPreparation(filterPrepForm,groupSize,formData){
    const sortedEntries = Object.entries(filterPrepForm).sort((a, b) => a[1].count - b[1].count);
  // Convert sorted array back to an object
  const filteredEntries = sortedEntries.filter(entry => entry[1].uid.length > 0);
  
  // Step 3: Create arrays for x (uid) and y (names corresponding to uid)
  let x = [];
  let y = [];
  let z = []
  
  filteredEntries.forEach(entry => {
    // For x, push the uid array
    x.push(entry[1].uid); 
    // For y, push the group name(s) (duplicated based on uid count)
    y.push(Array(entry[1].uid.length).fill(entry[0]));
    // For z, push the name array(s) (duplicated based on uid count)
    z.push(entry[1].name)
  });
  
  console.log("x:", x);
  console.log("y:", y);
  console.log("z:", z);
  console.log("groupSize",groupSize)
  console.log("formData",formData)

  console.log(this.groupingStudents(x,z,groupSize,formData))
  return this.groupingStudents(x,z,groupSize,formData)
}
  
  static groupingStudents(studentsArr,namesArr,group,formData){
      console.log("students; ", studentsArr, studentsArr.flat())
      console.log("names: ", namesArr)
      const students = studentsArr.flat()
        const names = namesArr.flat()
      let groupState = 0
      let groupedStudent = []
      let finalGroup = {}
      let tableTitle=[]
    
      for (let i = 0; i < students.length; i++) {
       groupState  = groupState === group ? 1 : groupState+1;
       if(!Object.hasOwn(finalGroup, ["Group " + groupState])){
        //  finalGroup["Group " + groupState] = { students: [], skills: [] }
        finalGroup["Group " + groupState] = {studentsAndSkills:[]}
       }
        
        if (!groupedStudent.includes(students[i]) ) {
         
          // finalGroup["Group " + groupState]["students"].push(names[i])
          // finalGroup["Group " + groupState]["skills"] = [
          //   ...new Set([
          //     ...finalGroup["Group " + groupState]["skills"],
          //     ...formData.find((item) => item.uid === students[i].toString())
          //       .skillArr,
          //   ]),
          // ]
          finalGroup["Group " + groupState]["studentsAndSkills"].push({name:names[i],
            skills:formData.find((item) => item.uid === students[i].toString())
            .tableSkills.filter(item => item.tableTitle)
          })
          tableTitle =[...new Set([...tableTitle, ...formData.find((item) => item.uid === students[i].toString())
          .tableSkills.filter(item => item.tableTitle).map(item => item.tableTitle)])]
           
        
          groupedStudent.push(students[i])
          console.log("if===",students[i],groupedStudent)
        } 
        else{
          groupState -= 1;
        }
      }
      // for(let l=0;l<students.length;l++){
      // //console.log("===",l,students.length,students[l])
      //     for(let i=0;i<students[l].length;i++){
      //         //console.log(typeof(i),i,l,finalGroup['Group '+(i+1)], 'Group '+(i+1),groupedStudent,students[l][i])
      //         if(!finalGroup['Group '+(i+1)] && (i+1)<=group && !groupedStudent.includes(students[l][i]) ){
      //                finalGroup['Group '+(i+1)]={students:[],skills:[]}
      //             finalGroup['Group '+(i+1)]['students'].push(names[l][i]) 
      //             finalGroup['Group '+(i+1)]['skills'] = [...new Set([...finalGroup['Group '+(i+1)]['skills'], ...formData.find(item => item.uid === students[l][i].toString()).skillArr ])]
      //             groupState += 1
      //             groupedStudent.push(students[l][i])
      //              //console.log("if===",students[0][l],groupedStudent)
      //         }else if(!finalGroup['Group '+(groupState+1)] && (groupState+1)<=group && !groupedStudent.includes(students[l][i]) ){
      //             finalGroup['Group '+(groupState+1)]={students:[],skills:[]}
      //             finalGroup['Group '+(groupState+1)]['students'].push(names[l][i])
      //             finalGroup['Group '+(groupState+1)]['skills'] = [...new Set([...finalGroup['Group '+(groupState+1)]['skills'], ...formData.find(item => item.uid === students[l][i].toString()).skillArr ])]
      //             groupState += 1 
      //             //console.log("else===",l,i,students[l][i],groupedStudent)
      //             groupedStudent.push(students[l][i])
      //         }
      //         else if(finalGroup['Group '+(i+1)] &&  !groupedStudent.includes(students[l][i])){
      //         //console.log(i,l)
      //         // finalGroup['Group '+(i+1)]={student:[]}
      //             finalGroup['Group '+(i+1)]['students'].push(names[l][i])
      //             finalGroup['Group '+(i+1)]['skills'] = [...new Set([...finalGroup['Group '+(i+1)]['skills'], ...formData.find(item => item.uid === students[l][i].toString()).skillArr ])]
      //             groupedStudent.push(students[l][i])
      //         } 
  
      //     }
      // }
      return {finalGroup:finalGroup,tableTitle:tableTitle}
  }
  }
  
  module.exports = GroupingAlgorithm;


// const fs = require('fs');

// // Parse skills and priorities dynamically from a JSON file
// const skills = JSON.parse(fs.readFileSync('data/skills.json'));

// // Calculate skill weights based on priority
// const skillWeights = {};
// if (Array.isArray(skills.skills)) {
//   skills.skills.forEach(skill => {
//     skillWeights[skill.id] = 1 / skill.priority;
//   });
// } else {
//   console.error("Skills array is not defined or is invalid.");
// }

// /**
//  * Calculate the fitness of group assignments
//  * @param {Array} groups - Array of groups, each containing student indices
//  * @param {Array} students - Array of student objects
//  * @returns {Number} Fitness score
//  */
// function calculateFitness(groups, students) {
//   let fitness = 0;

//   groups.forEach(group => {
//     const skillSums = {};
//     const diversity = { gender: new Set(), ethnicity: new Set(), campus: new Set(), major: {} };

//     group.forEach(studentIndex => {
//       const student = students[studentIndex];

//       // Add student skills to skillSums
//       for (const skill in student.skills) {
//         skillSums[skill] = (skillSums[skill] || 0) + student.skills[skill] * skillWeights[skill];
//       }

//       // Track diversity
//       diversity.gender.add(student.gender);
//       diversity.ethnicity.add(student.ethnicity);
//       diversity.campus.add(student.campus);
//       diversity.major[student.major] = (diversity.major[student.major] || 0) + 1;
//     });

//     // Penalize large imbalances in skill totals
//     for (const skill in skillSums) {
//       fitness -= Math.abs(skillSums[skill] - skillSums[skill] / groups.length);
//     }

//     // Reward diversity
//     fitness += diversity.gender.size;
//     fitness += diversity.ethnicity.size;
//     fitness += diversity.campus.size;

//     // Penalize groups with more than 2 MKTG majors
//     if (diversity.major['MKTG'] > 2) {
//       fitness -= 10;
//     }
//   });

//   return fitness;
// }

// /**
//  * Genetic Algorithm for grouping
//  * @param {Array} students - Array of student objects
//  * @param {Number} numGroups - Number of groups to create
//  * @param {Number} generations - Number of generations to run
//  * @returns {Array} Best group assignment
//  */
// function geneticAlgorithm(students, numGroups, generations = 1000) {
//   const populationSize = 50;
//   let population = Array.from({ length: populationSize }, () =>
//     Array.from({ length: students.length }, () => Math.floor(Math.random() * numGroups))
//   );

//   for (let gen = 0; gen < generations; gen++) {
//     const fitnessScores = population.map(chromosome =>
//       calculateFitness(chromosomeToGroups(chromosome, numGroups), students)
//     );

//     // Sort population by fitness
//     const sorted = population.map((chromosome, i) => ({ chromosome, fitness: fitnessScores[i] }))
//         .sort((a, b) => b.fitness - a.fitness);

//     population = sorted.slice(0, populationSize / 2).map(entry => entry.chromosome);

//     // Crossover
//     while (population.length < populationSize) {
//       const parent1 = population[Math.floor(Math.random() * (populationSize / 2))];
//       const parent2 = population[Math.floor(Math.random() * (populationSize / 2))];
//       population.push(crossover(parent1, parent2));
//     }

//     // Mutation
//     population = population.map(chromosome => mutate(chromosome, numGroups));
//   }

//   // Return the best solution
//   return chromosomeToGroups(population[0], numGroups);
// }

// function chromosomeToGroups(chromosome, numGroups) {
//   const groups = Array.from({ length: numGroups }, () => []);
//   chromosome.forEach((groupIndex, studentIndex) => {
//     groups[groupIndex].push(studentIndex);
//   });
//   return groups;
// }

// function crossover(parent1, parent2) {
//   const point = Math.floor(Math.random() * parent1.length);
//   return parent1.slice(0, point).concat(parent2.slice(point));
// }

// function mutate(chromosome, numGroups) {
//   const index = Math.floor(Math.random() * chromosome.length);
//   chromosome[index] = Math.floor(Math.random() * numGroups);
//   return chromosome;
// }

// module.exports = { geneticAlgorithm };
