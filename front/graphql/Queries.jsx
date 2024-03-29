import {gql} from '@apollo/client';

//personnel
export const GET_ALL_PERSONNELS = gql `
query findAllpersonnel {
    findAllpersonnel {
        id
        firstName
        lastName
        phoneNumber
        situationMatrimonial
        sexe
        fonction
        status
        dateOfStartWork
        dateOfBirth
        childNumber
    }
}
`;

//category personnel
export const GET_ALL_Category_Personnel = gql ` 
query findAllcategoriepersonnel {
    findAllcategoriepersonnel {
        id
        nom
        description
        montant
    }
}
`;


export const GET_Category_Personnel_BY_ID = gql ` 
query findOneCategoriepersonnel ($id: String!) {
    findOneCategoriepersonnel (id: $id) {
        id
        nom
        description
        montant
    }
}
`;

export const GET_Category_Personnel_ID = gql ` 
query findCategoriepersonnelbypersonnel ($personnelid: String!) {
    findCategoriepersonnelbypersonnel (personnelid: $personnelid)
}
`;


//student
export const GET_ALL_STUDENT =  gql `
query findAllstudents {
        findAllstudents {
            id
            matricule
            firstname
            lastname
            dateOfBirth
            sex
            adress
            transport
            fatherFirstName
            fatherLastName
            fatherPhoneNumber
            fatherProfession
            motherFirstName
            motherLastName
            motherPhoneNumber
            motherProfession
            tutorFirstName
            tutorLastName
            tutorPhoneNumber
            tutorProfession
        }
    }
`

//categorie eleve
export const GET_ALL_Category_Eleve= gql ` 
    query findAllcategorieeleve {
        findAllcategorieeleve {
            id
            nom
            description
        }
    }
`;

//section 
export const GET_ALL_SECTION =  gql `
    query findAllsection {
        findAllsection {
            id
            name
            description
        }
    }
`;

//cycle 
export const GET_ALL_CYCLE =  gql `
    query findAllcycle {
        findAllcycle {
            id
            name
        }
    }
`;

//liste des classes
export const GET_ALL_CLASS =  gql `
    query findAllsalle {
        findAllsalle {
            id
            name
            section
            cycle
            montantPensionSalle
            effectif
        }
    }
`;

//get al frais inscription
export const GET_ALL_FRAIS_INSCRIPTION =  gql `
    query findAllfraisinscription {
        findAllfraisinscription {
            id
            nameFraisInscription
            montant
        }
    }
`;


// one Personnel
export const GET_ALL_PERSONNEL_BY_ID = gql `
    query findOnePersonnel ($id: String!) {
        findOnePersonnel (id: $id) {
            id
            firstName
            lastName
            phoneNumber
            situationMatrimonial
            sexe
            fonction
            status
            dateOfStartWork
            dateOfBirth
            childNumber
        }
    }
`;

//one student
export const GET_STUDENT_BY_ID =  gql `
    query findOnestudent ($id: String!) {
        findOnestudent (id: $id) {
            id
            matricule
            firstname
            lastname
            dateOfBirth
            sex
            adress
            transport
            fatherFirstName
            fatherLastName
            fatherPhoneNumber
            fatherProfession
            motherFirstName
            motherLastName
            motherPhoneNumber
            motherProfession
            tutorFirstName
            tutorLastName
            tutorPhoneNumber
            tutorProfession
        }
    }
`;


//annee academique
export const GET_ALL_ANNEE_ACADEMIQUE = gql `
    query findAllAnnerAccademique {
        findAllAnnerAccademique {
            id
            name
            description
        }
    }
`
//niveau d'etude
export const GET_ALL_STUDY_LEVEL = gql `
    query findAllNiveauEtude {
        findAllNiveauEtude {
            id
            name
            description
            montantPension
        }
    }
`

//get reduction scolarite
export const GET_ALL_REDUCTION_SCOLARITE = gql  `
    query findAllreductionscolarite {
        findAllreductionscolarite {
            id
            name
            description
            montant
            pourcentage
        }
    }
`;

//recuperqtion de toutes les tranches
export const GET_ALL_TRANCHE_PENSION = gql `
    query findAlltranche {
        findAlltranche {
            id
            name
            description
            dateLine
            montant
            priority
        }
    }
`;

export const GET_ALL_TRANCHE_STUDENT = gql `
    query findAlltranchestudent {
        findAlltranchestudent {
            id
            name
            description
            montant
            complete
            reste
            surplus
            avance
        }
    }
`;

export const GET_ALL_TRANCHE_PRIORITY = gql `
    query findAlltranchepriority {
        findAlltranchepriority {
            id
            name
            description
        }
    }
`;

//recuperation d'une tranche de pension
export const GET_TRANCHE_PENSION_BY_ID= gql `
    query tranche ($id: String!) {
        tranche (id: $id) {
            id
            name
            description
            dateLine
            montant
            priority
        }
    }
`;

export const GET_ALL_MONTANT_TRANCHE_BY_SALLE = gql `
    query findAmountsBySalle ($salleid: String!) {
        findAmountsBySalle (salleid: $salleid)
    }
`

export const GET_MONTANT_PENSION_SALLE_BY_STUDENT = gql `
    query findMontantPensionstudent ($studentid: String!) {
        findMontantPensionstudent (studentid: $studentid)
    }
`

//one cycle
export const GET_ONE_CYCLE =  gql `
    query findOnecycle ($id: String!) {
        findOnecycle (id: $id) {
            id
            name
        }
    }
`;

//recuperation d'une section
export const GET_ONE_SECTION = gql `
    query findOnesection ($id: String!) {
        findOnesection (id: $id) {
            id
            name
            description
        }
    }
`;

export const GET_LEVEL_BY_ID = gql`
    query niveaEtude ($id: String!) {
        niveaEtude (id: $id) {
            id
            name
            description
            montantPension
        }
    }
`

export const GET_USER_CONNECTED = gql `
query user ($id: String!) {
        user (id: $id) {
            id
            email
            password
            firstName
            lastName
            name
            role
            phoneNumber
            active
            deactivatedAt
        }
    }
`;


export const GET_ALL_USER = gql `
    query findAlluser {
        findAlluser {
            id
            email
            password
            firstName
            lastName
            name
            role
            phoneNumber
            active
            deactivatedAt
        }
    }
`;

//Tranche student by studentIf
export const GET_TRANCHE_STUDENT_BY_STUDENT_ID = gql `
    query getTrancheStudentByStudent ($studentid: String!) {
        getTrancheStudentByStudent (studentid: $studentid) {
            id
            name
            description
            montant
            complete
            reste
        }
    }
`;

//personnel by userid
export const GET_PERSONNEL_BY_USERID= gql `
    query getpersonnelbyaccount ($userid: String!) {
        getpersonnelbyaccount (userid: $userid) {
            id
            firstName
            lastName
            phoneNumber
            situationMatrimonial
            sexe
            fonction
            status
            dateOfStartWork
            dateOfBirth
            childNumber
        }
    }
`;

export const GET_CLASS_FEES_BY_STUDENT_ID = gql `
    query getClassfeebyStudent ($studentid: String!) {
        getClassfeebyStudent (studentid: $studentid)
    }
`
 export const GET_ALL_MONTANT_PENSION_CLASS = gql`
    query findAllpension {
        findAllpension {
            id
            name
            description
            montantPension
            dateLine
        }
    }
 `;

 export const GET_ALL_COURSES = gql`
    query findAllCourse {
        findAllCourse {
            id
            title
            time
        }
    }
 `;
export const GET_ALL_PERSONNEL_SALLE = gql`
    query findAllPersonnelSalle {
        findAllPersonnelSalle {
            id
        }
    }
`;

export const GET_PRIME= gql `
    query findAllprime {
        findAllprime {
            id
            nom
            description
            montant
        }
    }
`;

export const GET_ALL_COURSE_PERSONNEL_SALLE = gql `
    query findbyCoursePersonnelSalle ($salleid: String!, $personnelid: String!, $courseid: String!) {
        findbyCoursePersonnelSalle (salleid: $salleid, personnelid: $personnelid, courseid: $courseid) {
            id
        }
    }
`;

//recuperation des infos de l'eleve a partir de tranche student
export const GET_STUDENT_BY_TRANCHE_STUDENT = gql `
query getTrancheStudentByStudent ($studentid: String!) {
    getTrancheStudentByStudent (studentid: $studentid) {
        id
        name
        description
        montant
        complete
        reste
        surplus
    }
}
`; 

//recuperation de la classe deml'eleve\
export const GET_STUDENT_SALLE = gql `
    query findSalleByStudent ($studentid: String!) {
        findSalleByStudent (studentid: $studentid) {
            id
            name
            section
            cycle
            montantPensionSalle
            effectif
        }
    }
`

// recuperation du dernier paiement effectue

export const GET_LAST_PAYMENT = gql `
    query AmountRecentAvanceTrancheByStudent ($studentid: String!) {
        AmountRecentAvanceTrancheByStudent (studentid: $studentid)
    }
`;

export const GET_AVANCE_MONTANT_TRANCHE_BY_STUDENT = gql  `
    query SumAvanceTrancheByStudent ($studentid: String!, $trancheid: String!) {
        SumAvanceTrancheByStudent (studentid: $studentid, trancheid: $trancheid)
    }
`

export const GET_RESTE_TRANCHE_BY_STUDENT = gql `
    query RestTrancheByStudent ($studentid: String!, $trancheid: String!) {
        RestTrancheByStudent (studentid: $studentid, trancheid: $trancheid)
    }
`;

export const GET_ALL_MONTANT_TRANCHE_BY_STUDENT = gql `
    query AmountrExpectedByTranche ($studentid: String!) {
        AmountrExpectedByTranche (studentid: $studentid)    
    }
`;
export const GET_ALL_SALAIRE_BY_ID = gql `
query getsalairebypersonnel ($personnelid: String!) {
    getsalairebypersonnel (personnelid: $personnelid) {
        id
        jourPaie
        moisPaie
        montant
    }
}
`

export const GET_ALL_TRANCHE_DATE_LINE_BY_STUDENT = gql `
    query TrancheDateLine ($studentid: String!) {
        TrancheDateLine (studentid: $studentid)
    }
`

export const GET_ALL_TRANCHE_COMPLETE_BY_STUDENT = gql `
    query getalltranchecompletedbystudent ($studentid: String!) {
        getalltranchecompletedbystudent (studentid: $studentid) {
            id
            name
            description
            dateLine
            montant
        }
    }
`;

export const GET_ALL_MONTH_SALARY = gql `
query PersonnelMonthSalary ($personnelid: String!) {
    PersonnelMonthSalary (personnelid: $personnelid)
}
`;

export const GET_SALARY_NET = gql `
query PersonnelNetSalary ($personnelid: String!) {
    PersonnelNetSalary (personnelid: $personnelid)
}
`;