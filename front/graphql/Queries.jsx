import {gql} from '@apollo/client';

//personnel
export const GET_ALL_PERSONNELS = gql `
query findAllpersonnel {
    findAllpersonnel {
        id
        firstName
        lastName
        phoneNumber
        salary
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
        }
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
        salary
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
        }
    }
`;

//one cycle
export const GET_ONE_CYCLE =  gql `
    query findOnecycle ($id: String!) {
        findOnecycle (id: $id) {
            id
            name
        }
    }
`;


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
        salary
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
export const GET_ALL_MONTANT_PENSION_CLASS = gql`
    query findAllpension {
        findAllpension {
            id
            name
            description
            montant
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




