  import 
  {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Icon,
  } from "@chakra-ui/react";
  import Link from "next/link";
  import { HiOutlineHome, HiUserGroup } from "react-icons/hi";
  import { IoMdSchool, IoIosStats, IoIosArrowDown, IoBookSharp } from "react-icons/io";
  import { GiTakeMyMoney, GiPayMoney } from "react-icons/gi";
  import { MdOutlineClass, MdLibraryBooks, MdOutlineLibraryBooks, MdOutlinePayments } from "react-icons/md";
  import {MdOutlineSms} from "react-icons/md";
  import {FaLevelUpAlt} from "react-icons/fa"
  

  const AdminLayout = ({ children }) => {
    return (
     <Box h="100%"> 
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton pl={0} >
              <Link href="/dashboard">
                <Flex align="center" gap="1">
                  <Icon as={HiOutlineHome} />
                  <Box as="span">Dashboard</Box>
                </Flex>
              </Link>
            </AccordionButton>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton  pl={0}>
              <Flex align="center" gap="1">
                <Icon as={HiUserGroup} />
                <Box as="span">Personnel</Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/personnel">
                <Box as="span">Liste du Personnel</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/personnel/ajouterpersonnel">
                <Box as="span">Ajouter personnel</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/personnel/categorypersonnel">
                <Box as="span">Categorie personnel</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/comptePersonnel">
                <Box as="span" pb={1}>Compte personnel</Box>
              </Link>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton  pl={0}>
              <Flex align="center" gap="1">
                <Icon as={MdOutlineClass} />
                <Box as="span">Classes</Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/class">
                <Box as="span">Liste des classes</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/class/addclass">
                <Box as="span">Ajouter une classe</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/class/cyclesection">
                <Box as="span">Cycle & section</Box>
              </Link>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton pl={0}>
              <Flex align="center" gap="1">
                <Icon as={FaLevelUpAlt} />
                <Box as="span">Niveaux</Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/level/levelList">
                <Box as="span">Liste des niveaux</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/level/addLevel">
                <Box as="span">Ajouter un niveau</Box>
              </Link>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem> 
            <AccordionButton pl={0} >
              <Flex align="center" gap="1">
                <Icon as={IoMdSchool} />
                <Box as="span">Élèves</Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/eleves">
                <Box as="span">Liste des Élèves</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/eleves/ajoutereleve">
                <Box as="span">Ajouter un élève</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/eleves/categoryeleve">
                <Box as="span">Categorie élèves</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/eleves/reduction/reductionStudent">
                <Box as="span">Reduction scolarite</Box>
              </Link>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem> 
            <AccordionButton pl={0} >
              <Flex align="center" gap="1">
                <Icon as={MdLibraryBooks}/>
                <Box as="span">Matiere</Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/cours/listeDesCours">
                <Box as="span">Liste des matieres</Box>
              </Link>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton pl={0}>
              <Flex align="center" gap="1">
                <Icon as={MdOutlineClass} />
                <Box as="span">Pension</Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="pension/listeDroitScolaire">
                <Box as="span">Pension</Box>
              </Link>
            </AccordionPanel>
          </AccordionItem  >
          {/* <AccordionItem>
            <AccordionButton  pl={0}>
              <Flex align="center" gap="1">
                <Icon as={MdOutlineClass} />
                <Box as="span">Reduction</Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="reduction/reductionStudent">
                <Box as="span">Reduction scolarite</Box>
              </Link>
            </AccordionPanel>
          </AccordionItem> */}
          <AccordionItem>
            <AccordionButton pl={0} >
              <Flex align="center" gap="1">
                <Icon as={GiTakeMyMoney} />
                <Box as="span">Finances</Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/finances">
                <Box as="span">Finance 1</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/finances">
                <Box as="span">Finance 2</Box>
              </Link>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton pl={0} >
              <Flex align="center" gap="1">
                <Icon as={GiPayMoney}/>
                <Box as="span">Salaires</Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/payment">
                <Box as="span">Paiement</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/payment/lastpayments">
                <Box as="span">Derniers paiements</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/payment/ajouterprime">
                <Box as="span">Ajouter une prime</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/payment/ajouterretenue">
                <Box as="span">Ajouter une retenue</Box>
              </Link>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton pl={0} >
              <Flex align="center" gap="1">
                <Icon as={IoIosStats} />
                <Box as="span">Statistiques</Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/statistiques">
                <Box as="span">Statistiques 1</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/statistiques">
                <Box as="span">Statistiques 2</Box>
              </Link>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton pl={0} >
              <Flex align="center" gap="1">
                <Icon as={MdOutlineSms} />
                <Box as="span">Méssage</Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/message">
                <Box as="span"> Liste des message</Box>
              </Link>
            </AccordionPanel>
            <AccordionPanel pb={1} _hover={{background:"rgba(0,0,0,0.16)"}}>
              <Link href="/message/creersms">
                <Box as="span">Créer un message</Box>
              </Link>
            </AccordionPanel>
            {/* <AccordionPanel>
              <Link href="/mail/mail">
                <Box as="span">Mail</Box>
              </Link>
            </AccordionPanel> */}
          </AccordionItem>
        </Accordion>
        { children }
      </Box>
    );
  };
  
  export default AdminLayout;
  