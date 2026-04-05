/**
 * Base de connaissances CCISTTA
 * Chambre de Commerce, d'Industrie et de Services de la Région Tanger–Tétouan–Al Hoceima
 * Toutes les procédures administratives officielles
 */

const CCISTTA_INFO = {
  nom: "Chambre de Commerce, d'Industrie et de Services de la Région Tanger–Tétouan–Al Hoceima (CCISTTA)",
  president: "Abdelatif AFAILAL",
  directeur: "FOUAD ALOUCH EL KERRIASTI",
  site: "http://ccistta.net",
  extranet: "http://ccistta.net/extranet/monespace.php",
  paiements: ["TPE", "Trésor", "Régisseur"],
};

const PROCEDURES = {
  certificat_negatif: {
    titre: "Certificat Négatif (Guichet OMPIC)",
    code: "PR-03-81",
    revision: "01",
    edition: "03/12/2021",
    delai: "24 heures",
    objectif:
      "Délivrer le certificat négatif dans le cadre du travail du guichet OMPIC",
    etapes: [
      "Arrivée du ressortissant et remplissage de la fiche d'accueil",
      "Identification du cas : nouvelle dénomination, modification ou renouvellement",
      "Saisie des informations dans la plateforme OMPIC",
      "Paiement selon le cas",
      "Impression de la facture et ticket en double",
      "Délivrance de la facture et ticket au ressortissant",
      "Archivage et envoi de l'état au régisseur",
      "Envoi de la demande à l'OMPIC pour validation",
      "Délivrance du Certificat Négatif si validé",
    ],
    cas: {
      cas1: {
        titre: "Nouvelle dénomination/enseigne",
        description:
          "Présenter CIN, carte bancaire et 3 propositions de noms commerciaux par ordre de priorité",
        tarif: "230 DH",
      },
      cas2: {
        titre: "Modification de dénomination/activité avant immatriculation",
        description:
          "Le ressortissant doit être inscrit dans la plateforme du fonctionnaire concerné",
        tarif: "230 DH",
      },
      cas2b: {
        titre: "Modification de dénomination/activité après immatriculation",
        tarif: "480 DH",
      },
      cas3: {
        titre: "Renouvellement de dénomination/enseigne",
        description:
          "Renouvellement possible si la date est ≤ 3 mois avant expiration",
        tarif: "210 DH",
      },
    },
    rejet: {
      description: "Si l'OMPIC rejette la demande",
      retour_15j: "Retour dans ≤ 15 jours : aucun paiement supplémentaire",
      retour_apres: "Retour après 15 jours : refaire la procédure complète",
    },
  },

  carte_adhesion: {
    titre: "Carte d'Adhésion",
    code: "PR-03-27",
    revision: "07",
    edition: "22/04/2025",
    delai: "24 heures (si documents conformes)",
    objectif: "Délivrer la carte d'adhésion au ressortissant",
    eligibilite:
      "Seules les personnes physiques identifiées comme gérants associés, associés ou propriétaires au sein de la structure juridique sont éligibles",
    pieces_inscrit: {
      personne_physique: ["Renouvellement attestation d'inscription à la taxe professionnelle"],
      personne_morale: [
        "Attestation d'inscription à la taxe professionnelle",
        "Registre de commerce",
        "Dernier PV (si disponible)",
      ],
      note: "Vérification via Codes QR : RC modèle 7 et patente modèle J",
    },
    pieces_nouveau: {
      personne_physique: [
        "Attestation d'inscription à la taxe professionnelle de l'année en cours",
        "Photocopie de la CIN",
        "Photo personnelle",
      ],
      personne_morale: [
        "Attestation d'inscription à la taxe professionnelle de l'année en cours",
        "Registre de commerce de l'année en cours",
        "Statut",
        "Dernier PV",
      ],
      autoentrepreneur: [
        "Carte des autoentrepreneurs",
        "Attestation d'inscription au registre national des autoentrepreneurs",
        "CIN + photo d'identité",
      ],
    },
    tarifs: {
      personne_physique: "100 DH",
      personne_morale: "200 DH",
    },
    paiement: ["TPE", "Trésor", "Régisseur"],
  },

  location_salle: {
    titre: "Location de Salle",
    code: "PR-03-122",
    revision: "02",
    edition: "20/01/2025",
    delai: "Demande à déposer au moins 3 jours avant l'événement",
    objectif: "Louer les salles de la CCISTTA",
    etapes: [
      "Arrivée du demandeur et expression du besoin",
      "Dépôt de la demande au bureau d'ordre",
      "Vérification de la disponibilité de la salle",
      "Envoi au chef de département finance si disponible",
      "Décision du Président",
      "Dépôt de l'autorisation des autorités (entreprises et associations)",
      "Paiement selon la grille tarifaire",
      "Délivrance du reçu et autorisation",
    ],
    tarifs: {
      grande_salle: {
        nom: "Grande salle de conférence",
        associations_non_pro: "2 000 DH",
        associations_pro_societes: "Gratuite",
      },
      salle_formation: {
        nom: "Salle de Formation",
        associations_non_pro: "1 000 DH",
        associations_pro_societes: "Gratuite",
      },
    },
    pieces_requises: {
      societes: ["Registre de commerce", "Demande écrite"],
      associations: ["Reçu de dépôt légal", "Demande écrite"],
    },
  },

  attestation_libre_commercialisation: {
    titre: "Attestation de Libre Commercialisation (ALC)",
    code: "PR-03-75",
    revision: "05",
    edition: "20/01/2025",
    delai: "24 heures (si documents conformes)",
    objectif:
      "Délivrer l'attestation de libre commercialisation au ressortissant",
    prerequis: "Adhésion obligatoire à la CCISTTA",
    etapes: [
      "Arrivée du ressortissant",
      "Vérification de l'adhésion (obligatoire)",
      "Vérification de la documentation",
      "Paiement de 200 DH auprès du régisseur",
      "Préparation de la quittance",
      "Impression de l'attestation de libre commercialisation",
      "Signature de l'attestation par le signataire",
      "Délivrance de l'ALC",
      "Archivage d'une copie avec le dossier",
    ],
    tarif: "200 DH",
    pieces_requises: {
      personne_morale: [
        "Certification ISO ou Certificat de conformité + déclaration sur l'honneur",
        "Facture",
      ],
    },
  },

  attestation_professionnelle: {
    titre: "Attestation Professionnelle",
    code: "PR-03-37",
    revision: "07",
    edition: "22/04/2025",
    delai: "24 heures (si documents conformes)",
    objectif: "Délivrer l'attestation professionnelle aux ressortissants",
    eligibilite:
      "Seules les personnes physiques identifiées comme gérants associés, associés ou propriétaires au sein de la structure juridique sont éligibles",
    pieces_inscrit: {
      personne_physique: ["Renouvellement attestation d'inscription à la taxe professionnelle"],
      personne_morale: [
        "Attestation d'inscription à la taxe professionnelle",
        "Registre de commerce",
        "Dernier PV (si disponible)",
      ],
      note: "Vérification via Codes QR : RC modèle 7 et patente modèle J",
    },
    pieces_nouveau: {
      personne_physique: [
        "Attestation d'inscription à la taxe professionnelle de l'année en cours",
        "Photocopie de la CIN",
        "Photo personnelle",
      ],
      personne_morale: [
        "Attestation ICE",
        "Registre de commerce de l'année en cours",
        "Statut",
        "Dernier PV",
      ],
      autoentrepreneur: [
        "Carte des autoentrepreneurs",
        "Attestation d'inscription au registre national des autoentrepreneurs",
        "CIN + photo d'identité",
      ],
    },
    tarifs: {
      personne_physique: "50 DH",
      personne_morale: "100 DH",
    },
    paiement: ["TPE", "Trésor", "Régisseur"],
  },

  certificat_origine: {
    titre: "Certificat d'Origine (C.O)",
    code: "PR-03-46",
    revision: "06",
    edition: "17/12/2024",
    delai: "24 heures (si documents conformes)",
    objectif: "Délivrer le certificat d'origine au ressortissant",
    prerequis: "Adhésion obligatoire à la CCISTTA",
    lien_formulaire: "http://ccistta.net/extranet/monespace.php",
    etapes: [
      "Finalisation du formulaire sur l'extranet CCISTTA",
      "Arrivée du ressortissant à la CCISTTA",
      "Vérification de l'adhésion (obligatoire)",
      "Présentation de l'autorisation de versement et du dossier",
      "Vérification des documents (RC modèle 7 via QR, patente modèle J)",
      "Paiement du C.O auprès du régisseur",
      "Préparation de la quittance",
      "Impression du certificat d'origine",
      "Signature du C.O par le signataire",
      "Délivrance du C.O avec copie cachetée",
    ],
    tarif: {
      description: "1‰ du montant de la facture",
      minimum: "500 DH",
      maximum: "2 000 DH",
    },
    dossier: [
      "Facture objet de l'export (originale)",
      "Liste de colisage",
      "DUM (Déclaration Unique de Marchandises) ou bulletin de sortie",
    ],
    paiement: ["TPE", "Trésor", "Régisseur"],
  },

  demande_renseignement: {
    titre: "Demande de Renseignement (Guichet OMPIC)",
    code: "PR-03-91",
    revision: "01",
    edition: "13/03/2025",
    delai: "24 heures, au plus tard 48 heures",
    objectif:
      "Fournir aux ressortissants les renseignements concernant l'enregistrement au registre du commerce",
    etapes: [
      "Arrivée du ressortissant et remplissage de la fiche d'accueil",
      "Présenter le CIN + copie CIN",
      "Paiement de 180 DH",
      "Impression du ticket en double",
      "Saisie de la demande dans la plateforme SIPIC",
      "Délivrance de la facture et ticket au ressortissant",
      "Remplissage du formulaire C3",
      "Scan et envoi du dossier par mail à l'OMPIC pour examen",
      "Archivage d'une copie et envoi de l'état au régisseur",
    ],
    tarif: "180 DH",
    pieces_requises: ["CIN", "Copie CIN"],
    paiement: ["Trésor", "TPE"],
  },

  elaboration_marque: {
    titre: "Elaboration de la Marque (Guichet OMPIC)",
    code: "PR-03-100",
    revision: "00",
    edition: "08/02/2024",
    delai: "2 mois et demi depuis le dépôt du dossier",
    objectif: "Elaborer la marque via le guichet OMPIC",
    etapes: [
      "Arrivée du ressortissant",
      "Dépôt du fond de dossier",
      "Examen du dossier par le responsable guichet OMPIC",
      "Si conforme : paiement et envoi à l'OMPIC par mail",
      "OMPIC examine le dossier",
      "Si validé : délivrance de la facture, récépissé et certificat de marque",
      "Si rejeté : notification au demandeur (possibilité de réponse convaincante)",
    ],
    tarifs: {
      formule_basique_1_classe: {
        personne_morale: "2 400 DH",
        personne_physique: "1 800 DH",
      },
      classe_supplementaire: {
        personne_morale: "480 DH par classe",
        personne_physique: "360 DH par classe",
      },
      note: "L'OMPIC peut appliquer un tarif réduit",
    },
    dossier: {
      personne_morale: [
        "Formulaire M1",
        "Pouvoir de Mandataire",
        "Reproduction du logo",
        "Copie CIN",
      ],
      personne_physique: ["Formulaire M1", "Reproduction du logo", "Copie CIN"],
      note_etrangere:
        "Toute personne morale ou physique non localisée au Maroc doit obligatoirement fournir le Pouvoir Mandataire",
    },
  },

  certificat_design: {
    titre: "Certificat de Design (Guichet OMPIC)",
    code: "PR-03-110",
    revision: "00",
    edition: "08/02/2024",
    delai: "2 mois et demi depuis le dépôt du dossier",
    objectif: "Elaborer le certificat de design via le guichet OMPIC",
    etapes: [
      "Arrivée du ressortissant",
      "Dépôt du fond de dossier",
      "Examen du dossier par le responsable guichet OMPIC",
      "Si conforme : paiement et envoi à l'OMPIC par mail",
      "OMPIC examine le dossier",
      "Si validé : délivrance de la facture, récépissé et certificat de design",
      "Si rejeté : notification au demandeur (possibilité de réponse convaincante)",
    ],
    tarifs: {
      formule_basique_1_classe: {
        personne_morale: "960 DH",
        personne_physique: "760 DH",
      },
      classe_supplementaire: {
        personne_morale: "360 DH par classe",
        personne_physique: "360 DH par classe",
      },
      note: "L'OMPIC peut appliquer un tarif réduit",
    },
    dossier: {
      personne_morale: [
        "Formulaire D1",
        "Pouvoir de Mandataire",
        "Reproduction du design",
        "Copie CIN",
      ],
      personne_physique: [
        "Formulaire D1",
        "Reproduction du design",
        "Copie CIN",
      ],
      note_etrangere:
        "Toute personne morale ou physique non localisée au Maroc doit obligatoirement fournir le Pouvoir Mandataire",
    },
  },

  visa: {
    titre: "Visa (Document Légalisation)",
    code: "PR-03-56",
    revision: "06",
    edition: "20/01/2025",
    delai: "24 heures (si documents conformes)",
    objectif: "Délivrer le document VISA au ressortissant",
    prerequis: "Adhésion obligatoire à la CCISTTA",
    lien_formulaire: "http://ccistta.net/extranet/monespace.php",
    etapes: [
      "Finalisation du formulaire sur l'extranet CCISTTA",
      "Arrivée du ressortissant à la CCISTTA",
      "Vérification de l'adhésion (obligatoire)",
      "Présentation de l'autorisation de versement et du dossier",
      "Vérification des documents (RC modèle 7 via QR)",
      "Paiement de 300 DH auprès du régisseur",
      "Préparation de la quittance",
      "Impression du VISA",
      "Signature du VISA par le signataire",
      "Délivrance du VISA avec copie cachetée",
    ],
    tarif: "300 DH",
    dossier: {
      personne_physique: [
        "Attestation d'inscription à la taxe professionnelle",
        "Photocopie de la CIN",
        "Photo personnelle",
      ],
      personne_morale: [
        "Attestation d'inscription à la taxe professionnelle",
        "Photocopie de la CIN",
        "Photo personnelle",
        "Registre de commerce",
        "Statut",
        "Dernier PV",
      ],
    },
    paiement: ["TPE", "Trésor", "Régisseur"],
  },
};

/**
 * Génère le prompt système complet avec toutes les procédures
 */
function getSystemPrompt() {
  return `Tu es l'assistant virtuel officiel de la ${CCISTTA_INFO.nom}.

Ton rôle est d'informer les ressortissants et le public sur les procédures administratives de délivrance des documents et les services offerts par la CCISTTA.

## INFORMATIONS GÉNÉRALES CCISTTA
- Président : ${CCISTTA_INFO.president}
- Directeur Régional : ${CCISTTA_INFO.directeur}
- Site web : ${CCISTTA_INFO.site}
- Extranet (formulaires) : ${CCISTTA_INFO.extranet}
- Modes de paiement acceptés : ${CCISTTA_INFO.paiements.join(", ")}

## PROCÉDURES DISPONIBLES

### 1. CERTIFICAT NÉGATIF (Guichet OMPIC) — Code ${PROCEDURES.certificat_negatif.code}
**Délai :** ${PROCEDURES.certificat_negatif.delai}
**Cas et tarifs :**
- Nouvelle dénomination/enseigne : ${PROCEDURES.certificat_negatif.cas.cas1.tarif} — Documents : CIN, carte bancaire, 3 propositions de noms
- Modification avant immatriculation : ${PROCEDURES.certificat_negatif.cas.cas2.tarif}
- Modification après immatriculation : ${PROCEDURES.certificat_negatif.cas.cas2b.tarif}
- Renouvellement (si ≤ 3 mois avant expiration) : ${PROCEDURES.certificat_negatif.cas.cas3.tarif}
**En cas de rejet OMPIC :** Retour dans les 15 jours = pas de paiement supplémentaire. Au-delà = recommencer la procédure.

### 2. CARTE D'ADHÉSION — Code ${PROCEDURES.carte_adhesion.code}
**Délai :** ${PROCEDURES.carte_adhesion.delai}
**Éligibilité :** ${PROCEDURES.carte_adhesion.eligibilite}
**Tarifs :** Personne physique = ${PROCEDURES.carte_adhesion.tarifs.personne_physique} | Personne morale = ${PROCEDURES.carte_adhesion.tarifs.personne_morale}
**Pièces (nouveau) :**
- Personne physique : Taxe professionnelle en cours, CIN, photo
- Personne morale : Taxe professionnelle, RC, Statut, PV
- Autoentrepreneur : Carte autoentrepreneur, attestation registre national, CIN + photo

### 3. LOCATION DE SALLE — Code ${PROCEDURES.location_salle.code}
**Délai :** ${PROCEDURES.location_salle.delai}
**Tarifs :**
- Grande salle de conférence : Associations non professionnelles = ${PROCEDURES.location_salle.tarifs.grande_salle.associations_non_pro} | Professionnelles et sociétés = ${PROCEDURES.location_salle.tarifs.grande_salle.associations_pro_societes}
- Salle de formation : Associations non professionnelles = ${PROCEDURES.location_salle.tarifs.salle_formation.associations_non_pro} | Professionnelles et sociétés = ${PROCEDURES.location_salle.tarifs.salle_formation.associations_pro_societes}
**Pièces requises :** Sociétés : RC + demande | Associations : Reçu de dépôt légal + demande

### 4. ATTESTATION DE LIBRE COMMERCIALISATION (ALC) — Code ${PROCEDURES.attestation_libre_commercialisation.code}
**Délai :** ${PROCEDURES.attestation_libre_commercialisation.delai}
**Prérequis :** Adhésion CCISTTA obligatoire
**Tarif :** ${PROCEDURES.attestation_libre_commercialisation.tarif}
**Documents (personne morale) :** Certification ISO ou certificat de conformité + déclaration sur l'honneur + facture

### 5. ATTESTATION PROFESSIONNELLE — Code ${PROCEDURES.attestation_professionnelle.code}
**Délai :** ${PROCEDURES.attestation_professionnelle.delai}
**Éligibilité :** ${PROCEDURES.attestation_professionnelle.eligibilite}
**Tarifs :** Personne physique = ${PROCEDURES.attestation_professionnelle.tarifs.personne_physique} | Personne morale = ${PROCEDURES.attestation_professionnelle.tarifs.personne_morale}
**Pièces (nouveau) :**
- Personne physique : Taxe professionnelle en cours, CIN, photo
- Personne morale : Attestation ICE, RC, Statut, PV
- Autoentrepreneur : Carte autoentrepreneur, attestation registre national, CIN + photo

### 6. CERTIFICAT D'ORIGINE (C.O) — Code ${PROCEDURES.certificat_origine.code}
**Délai :** ${PROCEDURES.certificat_origine.delai}
**Prérequis :** Adhésion CCISTTA obligatoire + formulaire extranet
**Tarif :** ${PROCEDURES.certificat_origine.tarif.description} (min ${PROCEDURES.certificat_origine.tarif.minimum}, max ${PROCEDURES.certificat_origine.tarif.maximum})
**Dossier :** Facture originale d'export, liste de colisage, DUM ou bulletin de sortie

### 7. DEMANDE DE RENSEIGNEMENT OMPIC — Code ${PROCEDURES.demande_renseignement.code}
**Délai :** ${PROCEDURES.demande_renseignement.delai}
**Tarif :** ${PROCEDURES.demande_renseignement.tarif}
**Documents :** CIN + copie CIN
**Processus :** Plateforme SIPIC → Formulaire C3 → Envoi par mail à l'OMPIC

### 8. ELABORATION DE LA MARQUE (OMPIC) — Code ${PROCEDURES.elaboration_marque.code}
**Délai :** ${PROCEDURES.elaboration_marque.delai}
**Tarifs :**
- Formule basique (1 classe) : Personne morale = ${PROCEDURES.elaboration_marque.tarifs.formule_basique_1_classe.personne_morale} | Personne physique = ${PROCEDURES.elaboration_marque.tarifs.formule_basique_1_classe.personne_physique}
- Classe supplémentaire : PM = ${PROCEDURES.elaboration_marque.tarifs.classe_supplementaire.personne_morale} | PP = ${PROCEDURES.elaboration_marque.tarifs.classe_supplementaire.personne_physique}
**Dossier PM :** Formulaire M1, Pouvoir Mandataire, Reproduction logo, CIN
**Dossier PP :** Formulaire M1, Reproduction logo, CIN

### 9. CERTIFICAT DE DESIGN (OMPIC) — Code ${PROCEDURES.certificat_design.code}
**Délai :** ${PROCEDURES.certificat_design.delai}
**Tarifs :**
- Formule basique (1 classe) : Personne morale = ${PROCEDURES.certificat_design.tarifs.formule_basique_1_classe.personne_morale} | Personne physique = ${PROCEDURES.certificat_design.tarifs.formule_basique_1_classe.personne_physique}
- Classe supplémentaire : 360 DH/classe
**Dossier PM :** Formulaire D1, Pouvoir Mandataire, Reproduction du design, CIN
**Dossier PP :** Formulaire D1, Reproduction du design, CIN

### 10. VISA (Légalisation) — Code ${PROCEDURES.visa.code}
**Délai :** ${PROCEDURES.visa.delai}
**Prérequis :** Adhésion CCISTTA obligatoire + formulaire extranet
**Tarif :** ${PROCEDURES.visa.tarif}
**Dossier PP :** Taxe professionnelle, CIN, photo
**Dossier PM :** Taxe professionnelle, CIN, photo, RC, Statut, PV

## RÈGLES DE COMPORTEMENT
1. Réponds toujours en français (ou en arabe si l'utilisateur écrit en arabe)
2. Sois précis, concis et professionnel
3. Si une question dépasse tes connaissances sur la CCISTTA, dis-le honnêtement et oriente vers le site officiel
4. Ne fournis jamais d'informations incorrectes
5. Pour les procédures nécessitant une adhésion, rappelle-le clairement
6. Rappelle les délais et les tarifs exacts issus des procédures officielles`;
}

module.exports = { PROCEDURES, CCISTTA_INFO, getSystemPrompt };
