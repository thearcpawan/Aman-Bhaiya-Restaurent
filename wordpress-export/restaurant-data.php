<?php
// Casa Da Peixe & Lapicanha - WordPress Data Export
// Use this data to populate your WordPress site

// Restaurant Information
$restaurants = array(
    'casa_da_peixe' => array(
        'name' => 'Casa Da Peixe',
        'description' => 'Specializing in the freshest seafood and traditional Portuguese coastal cuisine. Our dishes celebrate the bounty of the sea with authentic recipes passed down through generations of fishermen and coastal cooks.',
        'address' => 'Largo José Afonso 64, 2900-633<br>Setúbal, Portugal',
        'phone' => '+351 926 091 468',
        'whatsapp' => '+351 926 091 468',
        'instagram' => '@casadepeixe3',
        'instagram_url' => 'https://www.instagram.com/casadepeixe3/',
        'tagline' => 'Fresh seafood and Portuguese coastal flavors'
    ),
    'lapicanha' => array(
        'name' => 'Lapicanha',
        'description' => 'Premium grilled meats and traditional Portuguese flavors in a warm, rustic atmosphere. We specialize in perfectly prepared picanha and other prime cuts, paired with authentic Portuguese sides and wines.',
        'address' => 'Avenida da República, 245<br>1050-186 Lisboa, Portugal',
        'phone' => '+351 210 654 321',
        'tagline' => 'Premium grilled meats and traditional flavors'
    )
);

// Casa Da Peixe Menu Items
$casa_menu = array(
    'starters' => array(
        array('name' => 'Cesto de Pão', 'price' => '1.50€', 'desc' => 'Fresh bread basket'),
        array('name' => 'Queijo Seco', 'price' => '4.50€', 'desc' => 'Portuguese dried cheese'),
        array('name' => 'Queijo Fresco', 'price' => '6.50€', 'desc' => 'Fresh Portuguese cheese'),
        array('name' => 'Azeitonas', 'price' => '2.50€', 'desc' => 'Portuguese olives'),
        array('name' => 'Presunto', 'price' => '11.00€', 'desc' => 'Portuguese cured ham'),
        array('name' => 'Sopa do Dia', 'price' => '3.00€', 'desc' => 'Daily soup'),
        array('name' => 'Sopa de Peixe', 'price' => '4.50€', 'desc' => 'Traditional Portuguese fish soup'),
        array('name' => 'Camarão ao Alhinho', 'price' => '17.00€', 'desc' => 'Garlic prawns'),
        array('name' => 'Ameijoas ao Natural', 'price' => '19.00€', 'desc' => 'Natural clams'),
        array('name' => 'Mexilhão à Original', 'price' => '19.90€', 'desc' => 'Original style mussels'),
        array('name' => 'Taquitos de Choco', 'price' => '12.00€', 'desc' => 'Cuttlefish strips'),
        array('name' => 'Lingueirão à Bolhão Pato', 'price' => '20.00€', 'desc' => 'Razor clams Bolhão Pato style'),
        array('name' => 'Salada de Polvo', 'price' => '7.00€', 'desc' => 'Octopus salad'),
        array('name' => 'Choco Frito', 'price' => '10.00€', 'desc' => 'Fried cuttlefish')
    ),
    'mains' => array(
        array('name' => 'Garoupa', 'price' => '21.00€', 'desc' => 'Grilled grouper portion'),
        array('name' => 'Dourada', 'price' => '17.00€', 'desc' => 'Grilled sea bream portion'),
        array('name' => 'Robalo', 'price' => '17.00€', 'desc' => 'Grilled sea bass portion'),
        array('name' => 'Salmão', 'price' => '18.00€', 'desc' => 'Grilled salmon portion'),
        array('name' => 'Peixe Espada', 'price' => '18.00€', 'desc' => 'Grilled scabbard fish'),
        array('name' => 'Sardinhas', 'price' => '15.00€', 'desc' => 'Grilled sardines'),
        array('name' => 'Bacalhau à Brás', 'price' => '16.00€', 'desc' => 'Traditional codfish with eggs and potatoes'),
        array('name' => 'Bacalhau à Gomes de Sá', 'price' => '17.00€', 'desc' => 'Codfish casserole with potatoes and onions'),
        array('name' => 'Cataplana de Marisco', 'price' => '28.00€', 'desc' => 'Seafood cataplana for two people'),
        array('name' => 'Paella de Marisco', 'price' => '25.00€', 'desc' => 'Seafood paella for two people'),
        array('name' => 'Arroz de Marisco', 'price' => '23.00€', 'desc' => 'Seafood rice for two people'),
        array('name' => 'Caldeirada de Peixe', 'price' => '22.00€', 'desc' => 'Traditional fish stew'),
        array('name' => 'Linguado Grelhado', 'price' => '24.00€', 'desc' => 'Grilled sole fish'),
        array('name' => 'Rodovalho Grelhado', 'price' => '26.00€', 'desc' => 'Grilled turbot'),
        array('name' => 'Polvo à Lagareiro', 'price' => '19.00€', 'desc' => 'Octopus with olive oil and potatoes')
    ),
    'desserts' => array(
        array('name' => 'Pastéis de Nata', 'price' => '4.50€', 'desc' => 'Traditional Portuguese custard tarts'),
        array('name' => 'Pudim Flan', 'price' => '4.50€', 'desc' => 'Portuguese flan pudding'),
        array('name' => 'Bolo de Bolacha', 'price' => '4.50€', 'desc' => 'Cookie cake'),
        array('name' => 'Mousse de Chocolate', 'price' => '4.50€', 'desc' => 'Chocolate mousse'),
        array('name' => 'Mousse de Manga', 'price' => '4.50€', 'desc' => 'Mango mousse'),
        array('name' => 'Doce da Casa', 'price' => '4.50€', 'desc' => 'House special dessert'),
        array('name' => 'Fruta', 'price' => '3.50€', 'desc' => 'Fresh fruit')
    ),
    'drinks' => array(
        array('name' => 'Água 1.5L', 'price' => '3.00€', 'desc' => 'Still water 1.5L'),
        array('name' => 'Água com Gás 1L', 'price' => '2.70€', 'desc' => 'Sparkling water 1L'),
        array('name' => 'Ice Tea', 'price' => '2.50€', 'desc' => 'Iced tea'),
        array('name' => 'Coca-Cola', 'price' => '2.50€', 'desc' => 'Coca-Cola'),
        array('name' => 'Sagres', 'price' => '2.50€', 'desc' => 'Portuguese beer'),
        array('name' => 'Imperial', 'price' => '2.50€', 'desc' => 'Draft beer'),
        array('name' => 'Sangria Branca 1L', 'price' => '14.90€', 'desc' => 'White sangria 1L'),
        array('name' => 'Sangria Tinta 1L', 'price' => '14.90€', 'desc' => 'Red sangria 1L'),
        array('name' => 'Vinho Branco (Jarro)', 'price' => '8.00€/1L', 'desc' => 'House white wine'),
        array('name' => 'Vinho Tinto (Jarro)', 'price' => '8.00€/1L', 'desc' => 'House red wine'),
        array('name' => 'Ermelinda', 'price' => '12.00€', 'desc' => 'Portuguese white wine'),
        array('name' => 'Caipirinha', 'price' => '6.00€', 'desc' => 'Brazilian caipirinha'),
        array('name' => 'Mojito', 'price' => '8.00€', 'desc' => 'Classic mojito'),
        array('name' => 'Café', 'price' => '1.20€', 'desc' => 'Portuguese espresso'),
        array('name' => 'Chá', 'price' => '1.50€', 'desc' => 'Tea'),
        array('name' => 'Meia de Leite', 'price' => '2.00€', 'desc' => 'Coffee with milk')
    )
);

// Lapicanha Menu Items  
$lapicanha_menu = array(
    'starters' => array(
        array('name' => 'CESTO DE PÃO 2 UNIDADES', 'price' => '1.50€', 'desc' => 'BREAD BASKET 2 UNITS'),
        array('name' => 'QUEIJO SECO', 'price' => '4.50€', 'desc' => 'DRY CHEESE'),
        array('name' => 'QUEIJO AMANTEIGADO', 'price' => '6.50€', 'desc' => 'BUTTERY CHEESE'),
        array('name' => 'AZEITONAS', 'price' => '3.50€', 'desc' => 'OLIVES'),
        array('name' => 'CREPES LA PICANHA', 'price' => '5.00€', 'desc' => 'SPRINGROLES'),
        array('name' => 'MANTEIGA', 'price' => '1.00€', 'desc' => 'BUTTER'),
        array('name' => 'PRESUNTO', 'price' => '10.00€', 'desc' => 'HAM'),
        array('name' => 'PICA PAU', 'price' => '4.50€', 'desc' => 'WOODPECKER COOKED PICANHA WITH SAUCE')
    ),
    'mains' => array(
        array('name' => 'HAMBURGER NO PRATO', 'price' => '14.90€', 'desc' => 'ARROZ, BATATA FRITA E FEIJÃO'),
        array('name' => 'HAMBURGUER VEGANO', 'price' => '15.90€', 'desc' => 'ARROZ E BATATAS FRITAS'),
        array('name' => 'HAMBURGER LA PICANHA', 'price' => '15.90€', 'desc' => 'HAMBURGUER NO PÃO, CEBOLA FRITA, BACON, QUEIJO CHEDDAR E TOMATE, ACOMPANHA BATATAS FRITAS'),
        array('name' => 'ESPETADA DE PICANHA', 'price' => '15.90€', 'desc' => 'NACOS DE PICANHA GRELHADO, COM CHOURIÇO, ACOMPANHA COM ARROZ E BATATA FRITA'),
        array('name' => 'FRANGO À LA PICANHA', 'price' => '18.90€', 'desc' => 'PEITO DE FRANGO RECHEADO COM BACON, CHEDDAR, ACOMPANHA COM MOLHO DE ALHO COM ERVAS, ARROZ, SALADA E BATATAS FRITAS'),
        array('name' => 'BIFE DE FRANGO', 'price' => '15.90€', 'desc' => 'BIFE DE FRANGO GRELHADO ACOMPANHA COM ARROZ E BATATA FRITA'),
        array('name' => 'PICANHA Á DISCRIÇÃO', 'price' => '19.50€', 'desc' => 'ARROZ, FEIJÃO, BATATAS FRITAS, SALADA E FAROFA'),
        array('name' => 'PREMIUM ENTRECÔTE (350G)', 'price' => '24.90€', 'desc' => 'ARROZ, FEIJÃO E BATATAS FRITAS'),
        array('name' => 'PREMIUM PICANHA (350G)', 'price' => '24.90€', 'desc' => 'BATATAS FRITAS, ARROZ, FEIJÃO'),
        array('name' => 'PICANHA NO PRATO (MENU EXECUTIVO)', 'price' => '15.00€', 'desc' => 'ARROZ FEIJÃO E BATATAS FRITAS COM DIREITO A UMA BEBIDA E UM CAFÉ'),
        array('name' => 'FRANGO Á LA PICANHA (MENU INFANTIL)', 'price' => '10.50€', 'desc' => 'ARROZ E BATATAS FRITAS - O MENU INFATIL É APLICADO PARA CRIANÇAS DE 4 A 9 ANOS'),
        array('name' => 'PICANHA NO PRATO (MENU INFANTIL)', 'price' => '10.50€', 'desc' => 'ARROZ E BATATAS FRITAS - O MENU INFATIL É APLICADO PARA CRIANÇAS DE 4 A 9 ANOS')
    ),
    'desserts' => array(
        array('name' => 'CHEESECAKE OREO', 'price' => '5.00€', 'desc' => ''),
        array('name' => 'CHEESECAKE FRUTOS VERMELHOS', 'price' => '4.50€', 'desc' => ''),
        array('name' => 'CHEESECAKE CARAMELO SALGADO', 'price' => '5.00€', 'desc' => ''),
        array('name' => 'BOLO BRIGADEIRO', 'price' => '4.50€', 'desc' => ''),
        array('name' => 'CHEESECAKE LIMA', 'price' => '4.50€', 'desc' => ''),
        array('name' => 'BOLO DE BOLACHA', 'price' => '4.50€', 'desc' => ''),
        array('name' => 'PETIT GATEAU C/ GELADO', 'price' => '5.50€', 'desc' => ''),
        array('name' => 'CAIXA LISBOETAS', 'price' => '13.00€', 'desc' => ''),
        array('name' => 'PUDIM', 'price' => '4.50€', 'desc' => ''),
        array('name' => 'MUSSE DE CHOCOLATE', 'price' => '4.50€', 'desc' => ''),
        array('name' => 'DOCE DA CASA', 'price' => '4.50€', 'desc' => ''),
        array('name' => 'BOLA DE GELADO', 'price' => '2.50€', 'desc' => '')
    ),
    'drinks' => array(
        array('name' => 'CAFÉ', 'price' => '1.20€', 'desc' => ''),
        array('name' => 'DESCAFEINADO', 'price' => '1.20€', 'desc' => ''),
        array('name' => 'CHA', 'price' => '1.50€', 'desc' => ''),
        array('name' => 'MEIA DE LEITE', 'price' => '2.00€', 'desc' => ''),
        array('name' => 'IRISH COFFE', 'price' => '5.00€', 'desc' => ''),
        array('name' => 'ÁGUA PURIFICADA', 'price' => '2.70€', 'desc' => ''),
        array('name' => 'COCA-COLA', 'price' => '2.20€', 'desc' => ''),
        array('name' => 'SAGRES', 'price' => '2.20€', 'desc' => ''),
        array('name' => 'IMPERIAL HEINEKEN', 'price' => '2.50€', 'desc' => ''),
        array('name' => 'DONA ERMELINDA', 'price' => '12.00€', 'desc' => 'VINHO TINTO'),
        array('name' => 'MONTE VELHO', 'price' => '12.00€', 'desc' => 'VINHO TINTO'),
        array('name' => 'SANGRIA BRANCA 1L', 'price' => '14.90€', 'desc' => ''),
        array('name' => 'SANGRIA TINTA 1L', 'price' => '14.90€', 'desc' => ''),
        array('name' => 'SANGRIA ESPUMANTE 1L', 'price' => '17.90€', 'desc' => ''),
        array('name' => 'CAIPIRINHA', 'price' => '6.00€', 'desc' => ''),
        array('name' => 'MOJITO', 'price' => '8.00€', 'desc' => ''),
        array('name' => 'MARGUERITA', 'price' => '8.00€', 'desc' => '')
    )
);

// Output as JSON for easy import
echo "Restaurant Data for WordPress Import:\n\n";
echo "RESTAURANTS:\n";
echo json_encode($restaurants, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
echo "\n\nCASA DA PEIXE MENU:\n";
echo json_encode($casa_menu, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
echo "\n\nLAPICANHA MENU:\n";
echo json_encode($lapicanha_menu, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>