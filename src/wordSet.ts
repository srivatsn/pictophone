const words = [
    'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew',
    'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'papaya', 'quince', 'raspberry',
    'strawberry', 'tangerine', 'ugli', 'vanilla', 'watermelon', 'xigua', 'yellowfruit', 'zucchini',
    'airplane', 'alligator', 'ambulance', 'angel', 'ant', 'anvil', 'apple', 'arm', 'armchair', 'arrow',
    'ashtray', 'axe', 'baby', 'backpack', 'ball', 'balloon', 'banana', 'bandage', 'barn', 'bat',
    'bathtub', 'beach', 'bear', 'bed', 'bee', 'beetle', 'bell', 'belt', 'bench', 'bicycle', 'bird',
    'birthday', 'blackboard', 'blanket', 'boat', 'book', 'boot', 'bottle', 'bow', 'bowl', 'box',
    'boy', 'bracelet', 'brain', 'bread', 'bridge', 'broom', 'brush', 'bucket', 'bug', 'building',
    'bulb', 'bus', 'bush', 'butterfly', 'button', 'cactus', 'cake', 'calculator', 'calendar', 'camel',
    'camera', 'candle', 'candy', 'cannon', 'canoe', 'car', 'carpet', 'carrot', 'castle', 'cat',
    'caterpillar', 'ceiling', 'cellphone', 'chair', 'cheese', 'cherry', 'chicken', 'chimney', 'chocolate',
    'church', 'circle', 'clock', 'cloud', 'clown', 'coat', 'coin', 'comb', 'computer', 'cookie',
    'couch', 'cow', 'crab', 'crane', 'crocodile', 'crown', 'cup', 'cupcake', 'curtain', 'cushion',
    'daisy', 'deer', 'desk', 'diamond', 'dinosaur', 'dog', 'doll', 'dolphin', 'donkey', 'door',
    'dragon', 'drawer', 'drum', 'duck', 'eagle', 'ear', 'earth', 'egg', 'elephant', 'envelope',
    'eraser', 'eye', 'fan', 'feather', 'fence', 'finger', 'fire', 'fireplace', 'fish', 'flag',
    'flower', 'flute', 'fly', 'foot', 'fork', 'fountain', 'fox', 'frog', 'fruit', 'fryingpan',
    'garden', 'giraffe', 'girl', 'glasses', 'globe', 'glove', 'goat', 'grape', 'grass', 'guitar',
    'hamburger', 'hammer', 'hand', 'hat', 'head', 'heart', 'helicopter', 'helmet', 'hill', 'hippo',
    'horse', 'house', 'icecream', 'igloo', 'island', 'jacket', 'jellyfish', 'kangaroo', 'key', 'kite',
    'knife', 'ladder', 'lamp', 'leaf', 'leg', 'lemon', 'letter', 'light', 'lighthouse', 'lion',
    'lizard', 'lock', 'lollipop', 'magnet', 'mailbox', 'man', 'map', 'mask', 'match', 'microphone',
    'milk', 'mirror', 'monkey', 'moon', 'mosquito', 'mountain', 'mouse', 'mushroom', 'nail', 'necklace',
    'needle', 'nest', 'nose', 'notebook', 'octopus', 'orange', 'owl', 'panda', 'pants', 'paper',
    'parrot', 'pencil', 'penguin', 'phone', 'piano', 'pig', 'pineapple', 'pizza', 'plane', 'plant',
    'plate', 'plum', 'pocket', 'potato', 'pumpkin', 'purse', 'queen', 'rabbit', 'rain', 'rainbow',
    'ring', 'robot', 'rocket', 'rose', 'rug', 'ruler', 'sandwich', 'santa', 'scarf', 'scissors',
    'screw', 'seahorse', 'seal', 'shark', 'sheep', 'shell', 'shirt', 'shoe', 'shovel', 'sink',
    'skateboard', 'skull', 'snake', 'snowflake', 'snowman', 'sock', 'spider', 'spoon', 'star', 'strawberry',
    'street', 'sun', 'sunglasses', 'swan', 'sweater', 'swing', 'table', 'teddy', 'telephone', 'television',
    'tent', 'tiger', 'toaster', 'toilet', 'tomato', 'tooth', 'toothbrush', 'towel', 'tractor', 'train',
    'tree', 'truck', 'turtle', 'umbrella', 'unicorn', 'vase', 'violin', 'volcano', 'wagon', 'whale',
    'window', 'wolf', 'zebra', 'zipper', 'accordion', 'acorn', 'aircraft', 'alarm', 'albatross', 'algae',
    'alpaca', 'anchor', 'antelope', 'apron', 'arch', 'armadillo', 'arrowhead', 'artichoke', 'asparagus', 'asteroid',
    'avocado', 'baboon', 'badger', 'bag', 'bagel', 'bamboo', 'bandana', 'banjo', 'barbecue', 'barnacle',
    'barracuda', 'baseball', 'basket', 'batman', 'bay', 'beacon', 'beagle', 'bean', 'beaver', 'bedroom',
    'beet', 'bellpepper', 'bison', 'blender', 'blimp', 'blossom', 'blueberry', 'boar', 'bobcat', 'bonsai',
    'bookcase', 'bookmark', 'boomerang', 'bouquet', 'bowtie', 'brace', 'braces', 'bricks', 'broccoli', 'broomstick',
    'bubble', 'buffalo', 'buggy', 'bulldozer', 'bunny', 'butter', 'cabinet', 'cable', 'cactus', 'cage',
    'calculator', 'camel', 'camera', 'campfire', 'canary', 'candy', 'canoe', 'canyon', 'cap', 'cape',
    'caravan', 'card', 'cardboard', 'carp', 'carrot', 'cart', 'cartoon', 'cassette', 'castle', 'catfish',
    'cauliflower', 'cave', 'celery', 'centaur', 'centipede', 'chain', 'chairlift', 'chameleon', 'champagne', 'chandelier',
    'chapel', 'cheetah', 'cherryblossom', 'chess', 'chick', 'chili', 'chimney', 'chipmunk', 'chisel', 'chocolate',
    'chopsticks', 'church', 'cinnamon', 'circle', 'clamp', 'claw', 'clay', 'cliff', 'clover', 'club',
    'coal', 'coast', 'coconut', 'cod', 'coffee', 'coffin', 'coin', 'colander', 'collar', 'comb',
    'compass', 'cone', 'conifer', 'cookie', 'coral', 'corn', 'cornucopia', 'cottage', 'cotton', 'cougar',
    'cowboy', 'crabapple', 'crane', 'crayon', 'crescent', 'crocodile', 'crow', 'crown', 'crystal', 'cucumber',
    'cupcake', 'curtain', 'cushion', 'dachshund', 'daisy', 'dalmatian', 'dam', 'dandelion', 'dart', 'dawn',
    'deer', 'desk', 'diamond', 'dinosaur', 'diplodocus', 'dirt', 'diver', 'dodo', 'doghouse', 'dollhouse',
    'dolphin', 'donkey', 'doorbell', 'dove', 'dragonfly', 'drain', 'drawer', 'drill', 'drumstick', 'duckling',
    'dune', 'dusk', 'dust', 'eagle', 'earring', 'eel', 'eggplant', 'eggshell', 'elbow', 'elk',
    'elm', 'emu', 'engine', 'envelope', 'eraser', 'escalator', 'eyebrow', 'eyelash', 'eyelid', 'fairy',
    'falcon', 'fawn', 'feather', 'fern', 'fiddle', 'fig', 'finch', 'firefly', 'firetruck', 'fishbowl',
    'fishingrod', 'flagpole', 'flamingo', 'flax', 'flood', 'flour', 'flowerpot', 'flute', 'foam', 'fog',
    'footprint', 'forest', 'forklift', 'fossil', 'fountain', 'foxglove', 'freckle', 'fries', 'frog', 'frost',
    'frosting', 'fruitcake', 'fudge', 'fungus', 'fur', 'gargoyle', 'garlic', 'gazelle', 'gecko', 'gerbil',
    'giant', 'giraffe', 'glacier', 'glitter', 'gnome', 'goat', 'goggles', 'goldfish', 'goose', 'gopher',
    'gorilla', 'gourd', 'grain', 'grapefruit', 'grasshopper', 'gravel', 'gravy', 'gremlin', 'griffin', 'grill',
    'grizzly', 'grove', 'grub', 'guinea', 'guitar', 'gumdrop', 'guppy', 'hail', 'hairpin', 'hairtie',
    'halfmoon', 'halo', 'hammock', 'hamster', 'handcuffs', 'harbor', 'harp', 'harpoon', 'hatchet',
    'hazelnut', 'headband', 'headphones', 'headdress', 'hedgehog', 'helicopter', 'helmet', 'hermit', 'herring', 'hiker',
];

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}