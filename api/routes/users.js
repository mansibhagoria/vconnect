import express from 'express';
import User from '../models/Users.js'; 
import multer from 'multer';
import jwt from "jsonwebtoken";

const router = express.Router();
const upload = multer();

router.post('/sign', upload.single('profilePic'), async (req, res) => {
    try {
        const { pname, username, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        
        const newUser = new User({
            pname,
            username,
            password,
            
        });

        
        if (req.file) {
            const profilePicBuffer = req.file.buffer;
            const profilePicBase64 = profilePicBuffer.toString('base64');
            newUser.profilePic = profilePicBase64;
        }

        
        await newUser.save();

        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error during signup', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
  try {
      const { username, password } = req.body;
      
      const existingUser = await User.findOne( {username} );
      if (!existingUser) {
          return res.status(400).json({ message: 'User does not exist' });
      }
      if(existingUser.password !== req.body.password){
        return res.status(400).json({ message: 'Invalid password' });
      }

      // const isValidPassword = bcrypt.compareSync(req.body.password, existingUser.password);
      // if (!isValidPassword) {
      //     return res.status(400).json({ message: 'Invalid password' });
      // }
      const token = jwt.sign({ id: existingUser._id, isAdmin: existingUser.isAdmin }, process.env.JWT); 

      // const {password, ...rest }=  existingUser._doc;
      // console.log(token);
    return res.status(200).json({token: token})

  } catch (error) {
      console.error('Error during signup', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/profile-pic/:username', async (req, res) => {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username });
  
      if (!user || !user.profilePic) {
        return res.status(404).json({ message: 'Profile picture not found' });
      }
  
      
      const base64Image = user.profilePic;
      const imageBuffer = Buffer.from(base64Image, 'base64');
      res.writeHead(200, {
        'Content-Type': 'image/jpg', // Adjust content type based on your file type
        'Content-Length': imageBuffer.length,
      });
      res.end(imageBuffer);
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params; 
      // const user = await User.findOne({ id: req.params.id });
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.get('/search/:username', async (req, res) => {
    try {
      // const { id } = req.params; 
      const user = await User.findOne({ username: req.params.username });
      // const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  router.put('/:id', async (req, res) => {
    const { id } = req.params; 
    const { reqId } = req.body; 

    try {
        
        const user = await User.findById(id);
        const newRequest = await User.findById(reqId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

    
        await user.updateRequests(newRequest.username);

    
        return res.status(200).json({ message: 'Requests field updated successfully', user });
    } catch (error) {
        console.error('Error updating requests field:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
  
router.delete('/:userId/requests/:requestId', async (req, res) => {
  const { userId, requestId } = req.params;
  const user = await User.findById(userId);
try{
  if (!user) {
    // Handle case where user is not found
    return res.status(404).json({ message: 'User not found' });
  }

  // Use $pull operator to remove the specific request from the array
  user.requests.pull(requestId);
  user.friends.pull(requestId);
  // Save the updated user document
  await user.save();

  return res.status(200).json({ message: 'Request deleted successfully', user });
} catch (error) {
  
  return res.status(500).json({ message: 'Internal Server Error' });
}
  
});
router.put('/:userId/requests/:requestId', async (req, res) => {
  const { userId, requestId } = req.params;
  const user = await User.findById(userId);
try{
  if (!user) {
    // Handle case where user is not found
    return res.status(404).json({ message: 'User not found' });
  }

  
  user.friends.push(requestId);

  
  await user.save();

  return res.status(200).json({ message: 'Request deleted successfully', user });
} catch (error) {
  
  return res.status(500).json({ message: 'Internal Server Error' });
}
  
});



router.put('/update/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { username, bio, password } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) {
      user.username = username;
    }
    if (bio) {
      user.bio = bio;
    }
    if (password) {
      user.password = password;
    }

    await user.save();

    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;
