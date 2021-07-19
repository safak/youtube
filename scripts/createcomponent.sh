#! /bin/zsh -
mkdir -p ../src/$1/$2
touch ../src/$1/$2/$2.css
echo ".${2}
" > ../src/$1/$2/$2.sass 
echo "import './${2}.css'
export const ${(C)2} = ():JSX.Element => {
    return (
        <div className='${2}'>
           ${2} 
        </div>
    )
}" > ../src/$1/$2/${(C)2}.jsx
