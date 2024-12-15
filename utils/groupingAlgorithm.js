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

  console.log(this.groupingStudents(x,z,groupSize,formData))
  return this.groupingStudents(x,z,groupSize,formData)
}
  
  static groupingStudents(studentsArr,namesArr,group,formData){
      // console.log("students; ",students)
      //    console.log("names: ",names)
      //    console.log("formData: ",formData)
      // let groupState =0
      // let groupedStudent =[]
      // let finalGroup={}

      console.log("students; ", studentsArr, studentsArr.flat())
      console.log("names: ", namesArr)
      const students = studentsArr.flat()
        const names = namesArr.flat()
      let groupState = 0
      let groupedStudent = []
      let finalGroup = {}
    
      for (let i = 0; i < students.length; i++) {
       groupState  = groupState === group ? 1 : groupState+1;
       if(!Object.hasOwn(finalGroup, ["Group " + groupState])){
         finalGroup["Group " + groupState] = { students: [], skills: [] }
       }
        
        if (!groupedStudent.includes(students[i]) ) {
         
          finalGroup["Group " + groupState]["students"].push(names[i])
          finalGroup["Group " + groupState]["skills"] = [
            ...new Set([
              ...finalGroup["Group " + groupState]["skills"],
              ...formData.find((item) => item.uid === students[i].toString())
                .skillArr,
            ]),
          ]
        
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
      return finalGroup
  }
  }
  
  module.exports = GroupingAlgorithm;