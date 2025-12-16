dict1 = {"other": 11, "acer": 7}
dict2 = {"samsung": 22, "iphone": 9}
dict3 = {"other": 13, "samsung": 15}

merged_dict = dict1.copy()



for key, value in dict2.items():
    if key in merged_dict:
        merged_dict[key] += value
    else:
        merged_dict[key] = value


for key, value in dict3.items():
    if key in merged_dict:
        merged_dict[key] += value
    else:
        merged_dict[key] = value

print(merged_dict)



def mot_plus_long(phrase):
    mots = phrase.split()
    
    mot_long = mots[0]
    for mot in mots:
        if len(mot) > len(mot_long):
            mot_long = mot
    return mot_long


# phrase = input("Entrez une phrase : ")
# print(f"Mot le plus long : {mot_plus_long(phrase)}")


def inverser_mots_texte(texte):
    mots = texte.split()
    dictionnaire = {}
    
    for mot in mots:
        inverse = mot[::-1]
        dictionnaire[inverse] = mot
    
    return dictionnaire


T = input("Entrez un texte : ")
resultat = inverser_mots_texte(T)
print(f"Dictionnaire : {resultat}")

