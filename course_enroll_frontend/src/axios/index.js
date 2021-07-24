// configure axios
import axios from 'axios';

export default axios.create({
    baseURL:"http://a118422103fea4a6a80a26246316412e-2039132936.us-west-2.elb.amazonaws.com:8000",
})