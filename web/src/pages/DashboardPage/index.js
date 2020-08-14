import React, {useEffect, useState} from 'react'
import TitlePage from "../../components/TitlePage"
import {IconKafka, IconFolder, IconTopic, IconDelete, IconDashboard} from "../../svg"
import Button from "../../components/Button"
import Progress from "../../components/Progress"
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {ListSelection} from "../../components/ListSelection";
import {Input} from "../../components/Input";
import './Dashboard.less';

const DashboardPage = (props) => {
    const {title = 'Наименование страницы'} = props

    const [percentage, setPercentage] = useState(67)
    const [preText, setPreText] = useState('text')
    const [text, setText] = useState('text')
    const [url, setUrl] = useState('')
    const [email, setEmail] = useState('mail@sberbank.ru')
    const [tel, setTel] = useState('8 012 345-67-89')
    const [search, setSearch] = useState('')
    const [password, setPassword] = useState('')
    const [textarea, setTextarea] = useState('')
    const [img, setImg] = useState({})
    const [img64, setImg64] = useState('')
    const [checkbox1, setCheckbox1] = useState(true)
    const [checkbox2, setCheckbox2] = useState(true)
    const [radio, setRadio] = useState('')

    useEffect(() => {
        document.title = title
    })

    const cpuColor = value => {
        if (value < 50) return '#46a546'
        if (value < 80) return '#ffc40d'
        return '#c3325f'
    }

    const handleLoadImage = (img) => {
        setImg(img)
        const reader = new FileReader()
        const readerBase64 = new FileReader()
        reader.onloadend = function () {
            readerBase64.readAsDataURL(img)
        }
        reader.readAsArrayBuffer(img)
        readerBase64.onloadend = function () {
            setImg64(this.result)
        }
    }

    const onKeyUpField = e => {
        const isEnter = e.keyCode === 13
        if (isEnter) {
            setText(e.target.value)
        }
    }


    const isNumber = (num) => typeof num === 'number' && !isNaN(num);

    // Internet Explorer 6-11 detection
    const needDominantBaselineFix = /*@cc_on!@*/false || !!document.documentMode;

    return (
        <>
            <TitlePage icon={<IconDashboard size={'1em'}/>} label={title} className="flex-center"/>
            <div className="scrollhide align-center dashboardPage">
                <h2>h2 Dashboard Page</h2>
                <h3>h3 Dashboard Page</h3>
                <h4>h4 Dashboard Page</h4>
                <h5>h5 Dashboard Page</h5>
                <h6>h6 Dashboard Page</h6>
                <p>Some text <a href="/">Link some text</a> text text</p>
                <table>
                    <tbody>
                    <tr>
                        <td style={{width: "65%"}}>
                            <Input
                                id='label-text-00'
                                name='label-text-00'
                                type='text'
                                label='Text with action'
                                value={text}
                                onChange={e => {
                                    setText(e.target.value)
                                }}
                                direction='column' // column | row | reverse
                                // style={{}}
                                required
                                // disabled
                                // readonly
                                message='Ошибка'
                                className='error'
                                // placeholder='Text'
                                // pattern=''
                                // title=''
                                minlength={4}
                                maxlength={8}
                            />
                        </td>
                        <td style={{width: "35%"}}>
                            <p>{text}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input
                                id='label-text-01'
                                name='label-text-01'
                                type='text'
                                label='Text with Enter-action'
                                value={preText}
                                onChange={e => {
                                    setPreText(e.target.value)
                                }}
                                onKeyUp = {onKeyUpField}
                                direction='row reverse' // column | row | reverse
                                // style={{}}
                                required
                                // disabled
                                // readonly
                                message='Введите от 4 до 8 символов'
                                // className=''
                                // placeholder=''
                                // pattern=''
                                title='Нажмите Enter для применения введенных данных'
                                minlength={4}
                                maxlength={8}
                            />
                        </td>
                        <td>
                            <p>{text}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input
                                id='label-text-02'
                                name='label-text-02'
                                type='text'
                                label='Text disabled'
                                value={text}
                                onChange={e => {
                                    setText(e.target.value)
                                }}
                                direction='row' // column | row | reverse
                                // style={{}}
                                // required
                                disabled
                                // readonly
                                // message=''
                                // className=''
                                // placeholder=''
                                // pattern=''
                                // title=''
                                minlength={4}
                                maxlength={8}
                            />
                        </td>
                        <td>
                            <p>{text}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input
                                id='label-text-03'
                                name='label-text-03'
                                type='text'
                                label='Text with icon'
                                value={text}
                                onChange={e => {
                                    setText(e.target.value)
                                }}
                                direction='' // column | row | reverse
                                icon={<IconDelete/>}
                                // style={{}}
                                // required
                                // disabled
                                // readonly
                                // message=''
                                // className=''
                                // placeholder=''
                                // pattern=''
                                // title=''
                                minlength={4}
                                maxlength={8}
                            />
                        </td>
                        <td>
                            <p>{text}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input
                                id='label-text-04'
                                name='label-text-04'
                                type='text'
                                label='Text with icon right'
                                value={text}
                                onChange={e => {
                                    setText(e.target.value)
                                }}
                                direction='' // column | row | reverse
                                icon={<IconKafka/>}
                                // style={{}}
                                // required
                                // disabled
                                // readonly
                                // message=''
                                className='icon-right'
                                // placeholder=''
                                // pattern=''
                                // title=''
                                minlength={4}
                                maxlength={8}
                            />
                        </td>
                        <td>
                            <p>{text}</p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Input
                                id='label-text-05-lg'
                                name='label-text-05-lg'
                                type='text'
                                label='Text with action and external styles | large size (lg)'
                                value={text}
                                onChange={e => {
                                    setText(e.target.value)
                                }}
                                direction='column' // column | row | reverse
                                style={{color: '#4a4985'}}
                                icon={<IconKafka/>}
                                // required
                                // disabled
                                // readonly
                                message='Необходимо ввести от 2 до 4 латинских символа'
                                className='lg'
                                // placeholder=''
                                pattern="[a-z]{2,4}"
                                title='Необходимо ввести от 2 до 4 латинских символа'
                                // minlength={4}
                                // maxlength={8}
                            />
                        </td>
                        <td>
                            <p>{text}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input
                                id='label-text-05-md'
                                name='label-text-05-md'
                                type='text'
                                label='Text with action and external styles | default size (md)'
                                value={text}
                                onChange={e => {
                                    setText(e.target.value)
                                }}
                                direction='column' // column | row | reverse
                                style={{color: '#4a4985'}}
                                icon={<IconKafka/>} //IconDelete
                                // required
                                // disabled
                                // readonly
                                message='Необходимо ввести от 2 до 4 латинских символа'
                                // className=''
                                // placeholder=''
                                pattern="[a-z]{2,4}"
                                title='Необходимо ввести от 2 до 4 латинских символа'
                                // minlength={4}
                                // maxlength={8}
                            />
                        </td>
                        <td>
                            <p>{text}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input
                                id='label-text-05-sm'
                                name='label-text-05-sm'
                                type='text'
                                label='Text with action and external styles | small size (sm)'
                                value={text}
                                onChange={e => {
                                    setText(e.target.value)
                                }}
                                direction='column' // column | row | reverse
                                style={{color: '#4a4985'}}
                                icon={<IconKafka/>}
                                // required
                                // disabled
                                // readonly
                                message='Необходимо ввести от 2 до 4 латинских символа'
                                className='sm'
                                // placeholder=''
                                pattern="[a-z]{2,4}"
                                title='Необходимо ввести от 2 до 4 латинских символа'
                                // minlength={4}
                                // maxlength={8}
                            />
                        </td>
                        <td>
                            <p>{text}</p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Input
                                id='label-url-1'
                                name='label-url-1'
                                type='url'
                                label='Url'
                                value={url}
                                onChange={e => {
                                    setUrl(e.target.value)
                                }}
                                direction='column' // column | row | reverse
                                // style={{}}
                                // required
                                // disabled
                                // readonly
                                // message=''
                                // className=''
                                placeholder="https://www.sberbank.ru"
                                pattern="https://.*"
                                title='Адрес сайта должен начинаться с https://'
                                // minlength={15}
                                // maxlength={15}
                            />
                        </td>
                        <td>
                            <a href={url}>{url}</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input
                                id='label-email'
                                name='label-email'
                                type='email'
                                label='Email'
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value)
                                }}
                                direction='column' // column | row | reverse
                                // style={{}}
                                // required
                                // disabled
                                // readonly
                                // message=''
                                // className=''
                                // placeholder='Text'
                                pattern=".+@sberbank.ru"
                                title='Электронный адрес должен быть в домене sberbank.ru'
                                // minlength={15}
                                // maxlength={15}
                            />
                        </td>
                        <td>
                            <a href={`mailto:${email}`}>{email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input
                                id='label-tel'
                                name='label-tel'
                                type='tel'
                                label='Tel'
                                value={tel}
                                onChange={e => {
                                    setTel(e.target.value)
                                }}
                                direction='column' // column | row | reverse
                                // style={{}}
                                // required
                                // disabled
                                // readonly
                                // message=''
                                // className=''
                                placeholder='Text'
                                pattern="8 [0-9]{3} [0-9]{3}-[0-9]{2}-[0-9]{2}"
                                title='Телефон должен быть в формате 8 012 345-67-89'
                                minlength={15}
                                maxlength={15}
                            />
                        </td>
                        <td>
                            <p>{tel}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input
                                id='label-search'
                                name='label-search'
                                type='search'
                                label='Search'
                                value={search}
                                onChange={e => {
                                    setSearch(e.target.value)
                                }}
                                direction='column' // column | row | reverse
                                // style={{}}
                                // disabled
                                // readonly
                                // message=''
                                // className=''
                                placeholder='Введите поисковый запрос'
                                // pattern=''
                                // title=''
                                minlength={0}
                                maxlength={15}
                            />
                        </td>
                        <td>
                            <p>{search}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input
                                id='label-password'
                                name='label-password'
                                type='password'
                                label='Password'
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value)
                                }}
                                direction='column' // column | row | reverse
                                // style={{}}
                                // disabled
                                // message=''
                                // className=''
                                placeholder='Введите пароль'
                                // title=''
                                minlength={0}
                                maxlength={15}
                            />
                        </td>
                        <td>
                            <p>{password}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input
                                id='label-textarea'
                                name='label-textarea'
                                // textarea={true}
                                type='textarea'
                                label='Textarea'
                                value={textarea}
                                onChange={e => {
                                    setTextarea(e.target.value)
                                }}
                                direction='column' // column | row | reverse
                                // style={{}}
                                // disabled
                                // message=''
                                // className=''
                                placeholder='Введите текст'
                                // title=''
                                // minlength={0}
                                // maxlength={15}
                                rows='20'
                            />
                        </td>
                        <td>
                            <p>{textarea}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input
                                id='label-textarea-sm'
                                name='label-textarea-sm'
                                // textarea={true}
                                type='textarea'
                                label='Textarea | small size (sm)'
                                value={textarea}
                                onChange={e => {
                                    setTextarea(e.target.value)
                                }}
                                direction='column' // column | row | reverse
                                // style={{}}
                                // disabled
                                message='Введите текст'
                                className='sm'
                                placeholder='Введите текст'
                                // title=''
                                // minlength={0}
                                // maxlength={15}
                                rows='5'
                            />
                        </td>
                        <td>
                            <p>{textarea}</p>
                        </td>
                    </tr>


                    <tr>
                        <td>
                            <Input
                                id='label-number'
                                name='label-number'
                                type='number'
                                label='Number'
                                value={percentage}
                                onChange={e => {
                                    let number = isNumber(+e.target.value) ? +e.target.value : 0
                                    setPercentage(number)
                                }}
                                direction='' // column | row | reverse
                                // style={{}}
                                // required
                                // disabled
                                // readonly
                                // message=''
                                // className=''
                                // placeholder=''
                                // title=''
                                min={1}
                                max={100}
                                step={3}
                            />
                        </td>
                        <td rowSpan={4}>
                            <span style={{width: 200, display: 'inline-block'}}>
                                <Progress {...{
                                    to: 100,
                                    value: percentage,
                                    backgroundBar: `${cpuColor(100 / (100 / percentage))}`
                                }}/>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input
                                id='label-range-01'
                                name='label-range-01'
                                type='range'
                                label='Range with action onChange'
                                value={percentage}
                                onChange={e => {
                                    let number = isNumber(+e.target.value) ? +e.target.value : 0
                                    setPercentage(number)
                                }}
                                direction='' // column | row | reverse
                                // style={{}}
                                // disabled
                                // message=''
                                // className=''
                                // title=''
                                min={1}
                                max={100}
                                step={10}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input
                                id='label-range-02-sm'
                                name='label-range-02-sm'
                                type='range'
                                label='Range with small size (sm)'
                                value={percentage}
                                onChange={e => {
                                    let number = isNumber(+e.target.value) ? +e.target.value : 0
                                    setPercentage(number)
                                }}
                                direction='' // column | row | reverse
                                // style={{}}
                                // disabled
                                message='После выбора нажмите Enter'
                                className='sm'
                                title='После выбора нажмите Enter'
                                min={1}
                                max={100}
                                step={1}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Input
                                id='label-checkbox-1'
                                name='label-checkbox'
                                type='checkbox'
                                label='Checkbox'
                                checked={checkbox1}
                                onChange={e => {
                                    setCheckbox1(e.target.checked)
                                }}
                                direction='row' // column | row | reverse
                                // required
                                // style={{}}
                                // disabled
                                // message=''
                                // className=''
                                // title=''
                            />
                            <Input
                                id='label-checkbox-2'
                                name='label-checkbox'
                                type='checkbox'
                                label='Checkbox'
                                checked={checkbox2}
                                onChange={e => {
                                    setCheckbox2(e.target.checked)
                                }}
                                direction='row' // column | row | reverse
                                // required
                                // style={{}}
                                // disabled
                                // message=''
                                // className=''
                                // title=''
                            />
                        </td>
                        <td>
                            <p>{'' + checkbox1}</p>
                            <p>{'' + checkbox2}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input
                                id='label-checkbox-1-sm'
                                name='label-checkbox-sm'
                                type='checkbox'
                                label='Checkbox sm'
                                checked={checkbox1}
                                onChange={e => {
                                    setCheckbox1(e.target.checked)
                                }}
                                direction='row' // column | row | reverse
                                // required
                                // style={{}}
                                // disabled
                                // message=''
                                className='sm'
                                // title=''
                            />
                            <Input
                                id='label-checkbox-2-sm'
                                name='label-checkbox-sm'
                                type='checkbox'
                                label='Checkbox sm'
                                checked={checkbox2}
                                onChange={e => {
                                    setCheckbox2(e.target.checked)
                                }}
                                direction='row' // column | row | reverse
                                // required
                                // style={{}}
                                // disabled
                                // message=''
                                className='sm'
                                // title=''
                            />
                        </td>
                        <td>
                            <p>{'' + checkbox1}</p>
                            <p>{'' + checkbox2}</p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Input
                                id='label-radio-1'
                                name='label-radio'
                                type='radio'
                                label='Radio'
                                checked={radio === 'label-radio-1'}
                                value='label-radio-1'
                                onChange={e => {
                                    setRadio(e.target.value)
                                }}
                                direction='row' // column | row | reverse
                                // required
                                // style={{}}
                                // disabled
                                // message=''
                                // className=''
                                // title=''
                            />
                            <Input
                                id='label-radio-2'
                                name='label-radio'
                                type='radio'
                                label='Radio'
                                checked={radio === 'label-radio-2'}
                                value='label-radio-2'
                                onChange={e => {
                                    setRadio(e.target.value)
                                }}
                                direction='row' // column | row | reverse
                                // required
                                // style={{}}
                                // disabled
                                // message=''
                                // className=''
                                // title=''
                            />
                        </td>
                        <td>
                            <p>{'' + radio}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input
                                id='label-radio-1'
                                name='label-radio-sm'
                                type='radio'
                                label='Radio sm'
                                checked={radio === 'label-radio-1-sm'}
                                value='label-radio-1-sm'
                                onChange={e => {
                                    setRadio(e.target.value)
                                }}
                                direction='row' // column | row | reverse
                                // required
                                // style={{}}
                                // disabled
                                // message=''
                                className='sm'
                                // title=''
                            />
                            <Input
                                id='label-radio-2'
                                name='label-radio-sm'
                                type='radio'
                                label='Radio sm'
                                checked={radio === 'label-radio-2-sm'}
                                value='label-radio-2-sm'
                                onChange={e => {
                                    setRadio(e.target.value)
                                }}
                                direction='row' // column | row | reverse
                                // required
                                // style={{}}
                                // disabled
                                // message=''
                                className='sm'
                                // title=''
                            />
                        </td>
                        <td>
                            <p>{'' + radio}</p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Input
                                id='label-file'
                                name='label-file'
                                type='file'
                                label='Загрузка изображений'
                                accept='.jpg, .png, .gif'
                                onChange={e => {
                                    handleLoadImage(e.target.files[0])
                                }}
                                direction='' // column | row | reverse
                                // style={{}}
                                // disabled
                                // message=''
                                // className=''
                                // title=''
                            />
                        </td>
                        <td>
                            <ul>
                                <li>
                                    <small>Name:</small><br/>
                                    <code>{img.name}</code>
                                </li>
                                <li>
                                    <small>Size:</small><br/>
                                    <code>{img.size}</code>
                                </li>
                                <li>
                                    <small>Type:</small><br/>
                                    <code>{img.type}</code>
                                </li>
                                <li>
                                    <small>Payload (Base64 encoding):</small><br/>
                                    <img src={img64} style={{maxWidth: '200px'}} alt=''/>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input
                                id='label-file-sm'
                                name='label-file-sm'
                                type='file'
                                label='Загрузка изображений | sm'
                                accept='.jpg, .png, .gif'
                                onChange={e => {
                                    handleLoadImage(e.target.files[0])
                                }}
                                direction='' // column | row | reverse
                                // style={{}}
                                // disabled
                                // message=''
                                className='sm'
                                // title=''
                            />
                        </td>
                        <td>
                            <ul>
                                <li>
                                    <small>Name:</small><br/>
                                    <code>{img.name}</code>
                                </li>
                                <li>
                                    <small>Size:</small><br/>
                                    <code>{img.size}</code>
                                </li>
                                <li>
                                    <small>Type:</small><br/>
                                    <code>{img.type}</code>
                                </li>
                                <li>
                                    <small>Payload (Base64 encoding):</small><br/>
                                    <img src={img64} style={{maxWidth: '200px'}} alt=''/>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p>
                    <span style={{height: 200, width: 200, display: 'inline-block'}}>
                    <CircularProgressbar
                        value={percentage}
                        text={
                            <tspan dy={needDominantBaselineFix ? 12 : 3}>{percentage}%</tspan>
                        }
                        styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            rotation: 0,
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'butt',
                            // Text size
                            textSize: '36px',
                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 0.5,
                            // Can specify path transition in more detail, or remove it entirely
                            // pathTransition: 'none',
                            // Colors
                            pathColor: `${cpuColor(percentage)}`,
                            textColor: `${cpuColor(percentage)}`,
                            trailColor: '#b9b9b980',
                            backgroundColor: 'red',
                        })}
                    />
                    </span>
                </p>
                <p>
                    <Button icon={<IconTopic/>} text={'Button lg'} className="lg"/>
                    <Button icon={<IconKafka/>} text={'Button lg'} className="lg border"/>
                    <Button text={'Button lg'} className="lg red"/>
                </p>
                <p>
                    <Button text={'Button'}/>
                    <Button icon={<IconDelete/>} text={'Button border and radius'} className="white border radius"/>
                    <Button icon={<IconKafka/>} text={'Button border and radius'} className="violet border radius"/>
                    <Button text={'Button border'} className="border"/>
                </p>
                <p>
                    <Button icon={<IconDelete/>} text={'Button sm'} className="sm red"/>
                    <Button text={'Button sm'} className="sm orange"/>
                    <Button text={'Button sm'} className="sm yellow"/>
                    <Button icon={<IconFolder/>} text={'Button sm'} className="sm blue border radius"/>
                    <Button text={'Button sm'} className="sm"/>
                    <Button text={'Button sm'} className="sm border"/>
                    <Button text={'Button sm'} className="sm black"/>
                </p>
                <p>
                    <Button text={'Button sl'} className="sl"/>
                    <Button text={'Button sl long context'} className="black sl"/>
                    <Button text={'Name button'} className="border radius sl"/>
                </p>
                <p>
                    <Button icon={<IconFolder/>}/>
                    <Button icon={<IconTopic/>}/>
                    <Button icon={<IconKafka/>}/>
                </p>
                <div>
                    <ListSelection
                        items={[{}, {}]}/>
                </div>
                <div>
                    <ListSelection
                        className='list-color-selection'
                        selected='one'
                        width='50px'
                        height='50px'
                        style={{textAlign: 'center'}}
                        items={[
                            {
                                value: 'one',
                                bgColor: '#ffffff'
                            }, {
                                value: 'two',
                                bgColor: '#000000'
                            }, {
                                value: 'three',
                                bgColor: '#07984b'
                            }, {
                                value: 'four',
                                bgColor: '#000598'
                            }, {
                                value: 'five',
                                bgColor: '#981e00'
                            }
                        ]}/>
                </div>
            </div>
        </>
    )
}

export default DashboardPage
