### conda
Here is a step-by-step outline of how you can install ijavascript within a conda virtual environment. If you want to install with conda, but do not care about whether ijavascript is only available within a given virtual environment, then most of these steps can be skipped.

Note that in what follows, phrases enclosed in < and > denote places where you should substitute a value appropriate to your specific setup. If you haven't already created your conda virtual environment, do so now:
```
conda create --name <name of new virtual environment>
conda activate <name of new virtual environment>
conda install nodejs jupyter
```
For conda version 4.5.4. and version 1.0.0 of the jupyter conda package, the location of Jupyter in the new virtual environment will be $CONDA_PREFIX/etc/jupyter. This motivates the following commands:
```
cd $CONDA_PREFIX/etc
mkdir -p ./jupyter/nbdata ./conda/activate.d ./conda/deactivate.d
touch ./conda/activate.d/env_vars.sh ./conda/deactivate.d/env_vars.sh
```
Now use a text editor to make the contents of $CONDA_PREFIX/etc/conda/activate.d/env_vars.sh be the following:
```
#!/bin/bash
export JUPYTER_DATA_DIR=$CONDA_PREFIX/etc/jupyter/nbdata
export JUPYTER_CONFIG_DIR=$CONDA_PREFIX/etc/jupyter/nbconfig
```
and then use a text editor to make the contents of $CONDA_PREFIX/etc/conda/deactivate.d/env_vars.sh be the following:
```
#!/bin/bash
unset JUPYTER_DATA_DIR
unset JUPYTER_CONFIG_DIR
```
Exit and then re-enter the new virtual environment:
```
conda deactivate
conda activate <name of new virtual environment>
```
and then finally install ijavascript within the virtual environment:
```
npm install -g ijavascript
ijsinstall
```
Now ijavascript should not only be installed in your new virtual environment, but also be accessible only from that virtual environment.

**Notes:**

In the above, one should use #!/bin/bash only if one's shell is BASH, but #!/bin/sh if one's shell is Bourne shell, or #!/bin/zsh if one's shell is ZSH, etc.
Setting the value of Jupyter's configuration path (JUPYTER_CONFIG_DIR) isn't strictly necessary. However it will allow you to make changes to Jupyter's settings within that virtual environment without those changes propagating outside of the environment.
Exiting and re-entering the new virtual environment ensures that the script env_vars.sh actually gets called. Otherwise, there won't be any change to the values of the environment variables, and the kernel spec of ijavascript will be installed somewhere else besides the local Jupyter config folder we created above.
If you don't care about restricting ijavascript to a particular virtual environment, the following will work:
```
conda install nodejs
conda install jupyter
npm install -g ijavascript
ijsinstall
```